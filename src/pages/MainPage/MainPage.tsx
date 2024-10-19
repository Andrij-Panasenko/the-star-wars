import { useSelector } from 'react-redux';
import { selectCharacters } from '../../redux/selectors';
import CharacterCard from 'components/CharacterCard/CharacterCard';
import style from './MainPage.module.css';

export default function MainPage() {
    const characters = useSelector(selectCharacters);
    const { results } = characters;
    return (
        <>
            <ul className={style.characters_list}>
                {results.map((item) => (
                    <CharacterCard key={item.id} characterData={item} />
                ))}
            </ul>
            <button type="button" className={style.load_btn}>
                <span className={style.load_btn__text}>Load more</span>
            </button>
        </>
    );
}
