import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    fetchCharacterById,
    fetchFilmDetailById,
    fetchStarshipDetailById,
} from '../../redux/operations';
import style from './CharacterPage.module.css';
import '@xyflow/react/dist/style.css';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import { useSelector } from 'react-redux';
import {
    selectCharacterDetails,
    selectFilmDetails,
    selectStarshipDetails,
} from '../../redux/selectors';
import { clearFilmsAndStarshipsDetails } from '../../redux/characterSlice';

export default function CharacterPage() {
    const dispatch = useAppDispatch();
    const param = useParams<{ characterID: string }>();
    const characterData = useSelector(selectCharacterDetails);
    const filmsData = useSelector(selectFilmDetails);
    const starshipsData = useSelector(selectStarshipDetails);

    const { films = [], starships = [] } = characterData || {}; // getting arrays with id of films and starships from charaster details

    useEffect(() => {
        dispatch(fetchCharacterById(Number(param.characterID)));
    }, [dispatch, param.characterID]);

    useEffect(() => {
        const fetchData = async () => {
            // implementation of sequential query

            if (films.length >= 1) {
                for (const filmID of films) {
                    await dispatch(fetchFilmDetailById(filmID));
                }
            }

            if (starships.length >= 1) {
                for (const starshipID of starships) {
                    await dispatch(fetchStarshipDetailById(starshipID));
                }
            }
        };
        fetchData();

        // clear redux state of films and starships details
        return () => {
            dispatch(clearFilmsAndStarshipsDetails());
        };
    }, [dispatch, films.length, starships.length]);

    //chacter node
    const characterNode = {
        id: characterData?.id.toString() || 'unknown-id',
        position: { x: 550, y: 0 },
        data: { label: characterData?.name || 'Unknown Character' },
    };

    //transform films and starships details into array to pass necesary details to ReactFlow
    const filmNodes = filmsData.map((film, idx) => {
        return {
            id: film.id.toString(),
            position: { x: idx * 180, y: 250 },
            data: { label: film.title },
        };
    });

    const starshipNodes = starshipsData.map((starship, idx) => {
        return {
            id: starship.id.toString(),
            position: { x: idx * 180, y: 500 },
            data: { label: starship.model },
        };
    });

    //making edges to connect character node with films
    const filmEdges = filmsData.map((film) => {
        return {
            id: `char-to-film-${film.id}`,
            source: characterNode.id,
            target: film.id.toString(),
            label: 'film',
        };
    });

    //edges from films to starships
    const starshipEdges = starshipsData.map((starship) => {
        return {
            id: `film-to-starship-${starship.id}`,
            source:
                filmsData
                    .find((film) => film.starships.includes(starship.id))
                    ?.id.toString() || '',
            target: starship.id.toString(),
            label: 'starship',
        };
    });

    return (
        <>
            <div className={style.character_page}>
                <ReactFlow
                    nodes={[characterNode, ...filmNodes, ...starshipNodes]}
                    edges={[...filmEdges, ...starshipEdges]}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
}

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             setIsLoading(true); // початок запитів

//             // Перевірка та завантаження фільмів
//             if (films.length >= 1) {
//                 await films.reduce(async (previousPromise, filmID) => {
//                     await previousPromise;
//                     return dispatch(fetchFilmDetailById(filmID));
//                 }, Promise.resolve());
//             }

//             // Перевірка та завантаження зорельотів
//             if (starships.length >= 1) {
//                 await starships.reduce(async (previousPromise, starshipID) => {
//                     await previousPromise;
//                     return dispatch(fetchStarshipDetailById(starshipID));
//                 }, Promise.resolve());
//             }
//         } catch (error) {
//             console.log('Помилка у fetchData:', error);
//         } finally {
//             setIsLoading(false); // завершення всіх запитів
//         }
//     };

//     fetchData();

//     // очищення стану лише після повного завершення компонента
//     return () => {
//         dispatch(clearFilmsAndStarshipsDetails());
//     };
// }, [dispatch, films, starships]);
