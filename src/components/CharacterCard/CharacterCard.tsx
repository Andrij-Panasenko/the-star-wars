import { Character } from 'types/types';
import style from './CharacterCard.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCharacterById } from '../../redux/operations';
import { useNavigate } from 'react-router-dom';

export interface CharacterCardProps {
    characterData: Character;
}

export default function CharacterCard({ characterData }: CharacterCardProps) {
    const {name, id} = characterData;
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <>
            <li
                className={style.character_item}
                onClick={() => { dispatch(fetchCharacterById(id)); navigate(`/character/${id}`);}}
            >
                <h1>{name}</h1>
            </li>
        </>
    );
}
