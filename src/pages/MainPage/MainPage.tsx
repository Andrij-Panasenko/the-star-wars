import { useSelector } from 'react-redux';
import { selectCharacters, selectPage } from '../../redux/selectors';
import CharacterCard from 'components/CharacterCard/CharacterCard';
import style from './MainPage.module.css';
import { Character } from 'types/types';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchAllCharacters } from '../../redux/operations';
import { setPage } from '../../redux/characterSlice';
import Button from 'components/Button/Button';

export default function MainPage() {
    const dispatch = useAppDispatch();
    const characters = useSelector(selectCharacters);
    const page = useSelector(selectPage);

    // results - array of characters
    // next - shows whether or not there is a link to the next page to download character data. String or null
    // previous - shows whether or not there is a link to the previous page to download character data. String or null
    const { results, next, previous } = characters;

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
                    <Button
                        type="button"
                        onClick={() => dispatch(setPage(page - 1))}
                    >
                        Previous page
                    </Button>
                )}
                {next && (
                    <Button
                        type="button"
                        onClick={() => dispatch(setPage(page + 1))}
                    >
                        Next page
                    </Button>
                )}
            </div>
        </>
    );
}
