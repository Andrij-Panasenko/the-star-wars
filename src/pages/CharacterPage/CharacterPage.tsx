import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const characterData = useSelector(selectCharacterDetails);
    const filmsData = useSelector(selectFilmDetails);
    const starshipsData = useSelector(selectStarshipDetails);
    const { nodes, edges } = GenerateNodesAndEdges({
        characterData,
        filmsData,
        starshipsData,
    });

    const { films = [], starships = [] } = characterData || {}; // getting arrays with id of films and starships from charaster details

    console.log('🚀 ~ CharacterPage ~ starships:', starships);
    console.log('🚀 ~ CharacterPage ~ films:', films);

    useEffect(() => {
        dispatch(fetchCharacterById(Number(param.characterID)));
    }, [dispatch, param.characterID]);

    useEffect(() => {
        const fetchData = async () => {
            // paralel requests
            try {
                setIsLoading(true);
                const filmPromises = films.map((filmID) =>
                    dispatch(fetchFilmDetailById(filmID))
                );

                const starshipPromises = starships.map((starshipID) =>
                    dispatch(fetchStarshipDetailById(starshipID))
                );

                await Promise.all([...filmPromises, ...starshipPromises]);
                setIsLoading(false);
            } catch (error) {
                console.log('🚀 ~ fetchData ~ error:', error);
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
            {isLoading && (
                <div className={style.loading_container}>Loading page</div>
            )}
            {!isLoading && (
                <div className={style.character_page}>
                    {/* <ReactFlow nodes={nodes} edges={edges}>
                        <Background />
                        <Controls />
                    </ReactFlow> */}
                </div>
            )}
        </>
    );
}
