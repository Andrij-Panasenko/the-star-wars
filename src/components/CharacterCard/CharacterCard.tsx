import { Character } from 'types/types';
import style from './CharacterCard.module.css'

export interface CharacterCardProps {
    characterData: Character;
}

export default function CharacterCard({ characterData }: CharacterCardProps) {
    const {name} = characterData;
    return (
        <>
            <li className={style.character_item}>
                <h1>{name}</h1>
            </li>
        </>
    );
}
