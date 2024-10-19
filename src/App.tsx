import { useAppDispatch } from './hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchAllCharacters } from './redux/operations';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllCharacters(1));
    }, [dispatch]);
    return <></>;
}

export default App;
