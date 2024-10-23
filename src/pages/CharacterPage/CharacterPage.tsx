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
// import { ReactFlow, Controls, Background } from '@xyflow/react';
import { useSelector } from 'react-redux';
import { selectCharacterDetails } from '../../redux/selectors';
import { clearFilmsAndStarshipsDetails } from '../../redux/characterSlice';

export default function CharacterPage() {
    const dispatch = useAppDispatch();
    const param = useParams<{ characterID: string }>();
    const characterData = useSelector(selectCharacterDetails);
    console.log("🚀 ~ CharacterPage ~ characterData:", characterData)
    const { films = [], starships = [] } = characterData || {}; // getting arrays with id of films and starships from charaster details

    useEffect(() => {
        dispatch(fetchCharacterById(Number(param.characterID)));
    }, [dispatch, param.characterID]);

    // effect to implement parallel query by maping arrays of film and starships ID
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             if (films.length >= 1) {
    //                 const filmPromises = films.map((filmID: number) => {
    //                     dispatch(fetchFilmDetailById(filmID));
    //                 });
    //                 await Promise.allSettled(filmPromises);
    //             }

    //             if (starships.length >= 1) {
    //                 const starshipPromises = starships.map(
    //                     (starshipID: number) => {
    //                         dispatch(fetchStarshipDetailById(starshipID));
    //                     }
    //                 );
    //                 await Promise.allSettled(starshipPromises);
    //             }
    //         } catch (error) {
    //             console.log('useEffect', error);
    //         }
    //     };
    //     fetchData();
    // }, [dispatch, films, starships]);

    useEffect(() => {
        const fetchData = async () => {
            // implementation of sequential query
            try {
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
            } catch (error) {
                console.log('useEffect', error);
            }
        };
        fetchData();

        // clear redux state of films and starships details
        return () => {
            dispatch(clearFilmsAndStarshipsDetails());
        };
    }, [dispatch, films, starships]);

    

    // const node = [
    //     {
    //         id: '1', // required
    //         position: { x: 0, y: 0 }, // required
    //         data: { label: 'ekwryihnbgtovuu' }, // required
    //     },
    //     {
    //         id: '2',
    //         position: { x: 100, y: 100 },
    //         data: { label: 'nvwgeyrh8f su4oiuvn' },
    //     },
    // ];

    // const edges = [{ id: '1-2', source: '1', target: '2', label: 'to-the' }];

    return (
        <>
            <div className={style.character_page}>
                {/* <ReactFlow nodes={node} edges={edges}>
                    <Background />
                    <Controls />
                </ReactFlow> */}
            </div>
        </>
    );
}
