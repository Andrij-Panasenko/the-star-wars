import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../redux/operations';

export default function CharacterPage() {
    const dispatch = useAppDispatch();
    const param = useParams<{ characterID: string }>();

    useEffect(() => {
        dispatch(fetchCharacterById(Number(param.characterID)));
    }, [dispatch, param.characterID]);

    return (
        <>
            <div> ctaracter Page</div>
        </>
    );
}
