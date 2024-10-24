import { useSelector } from 'react-redux';
import { selectCharacters } from '../../redux/selectors';
import CharacterCard from 'components/CharacterCard/CharacterCard';
import style from './MainPage.module.css';
import { Character } from 'types/types';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchAllCharacters } from '../../redux/operations';

export default function MainPage() {
    const dispatch = useAppDispatch();
    const characters = useSelector(selectCharacters);

    // results - array of characters
    // next - shows whether or not there is a link to the next page to download character data. String or null
    // previous - shows whether or not there is a link to the previous page to download character data. String or null
    const { results, next, previous } = characters;

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        dispatch(fetchAllCharacters(page));
    }, [dispatch, page]);

    return (
        <>
            <ul className={style.characters_list}>
                {results.map((item: Character) => (
                    <CharacterCard key={item.id} characterData={item} />
                ))}
            </ul>
            <div className={style.load_btn__wrapper}>
                {previous && (
                    <button
                        type="button"
                        className={style.load_btn}
                        onClick={() => setPage((prevPage) => prevPage - 1)}
                    >
                        <span className={style.load_btn__text}>
                            Previous page
                        </span>
                    </button>
                )}
                {next && (
                    <button
                        type="button"
                        className={style.load_btn}
                        onClick={() => setPage((prevPage) => prevPage + 1)}
                    >
                        <span className={style.load_btn__text}>Next page</span>
                    </button>
                )}
            </div>
        </>
    );
}
