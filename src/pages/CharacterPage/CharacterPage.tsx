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
import GenerateNodesAndEdges from '../../generateNodesAndEdges';

export default function CharacterPage() {
    const dispatch = useAppDispatch();
    const param = useParams<{ characterID: string }>();
    const characterData = useSelector(selectCharacterDetails);
    const filmsData = useSelector(selectFilmDetails);
    const starshipsData = useSelector(selectStarshipDetails);
    const { nodes, edges } = GenerateNodesAndEdges({characterData, filmsData, starshipsData});

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

    return (
        <>
            <div className={style.character_page}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
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
