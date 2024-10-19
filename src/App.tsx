import { useAppDispatch } from './hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchAllCharacters } from './redux/operations';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import MainPage from 'pages/MainPage';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllCharacters(1));
    }, [dispatch]);
    return <>
        <Routes>
            <Route path="/" element={<SharedLayout/>}>
                <Route index element={<MainPage/>} />
            </Route>
        </Routes>
    </>;
}

export default App;
