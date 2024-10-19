import { useAppDispatch } from './hooks/useAppDispatch';
import { lazy, useEffect } from 'react';
import { fetchAllCharacters } from './redux/operations';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';
// import MainPage from 'pages/MainPage/MainPage';
// import CharacterPage from 'pages/CharacterPage/CharacterPage';

const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const CharacterPage = lazy(() => import('pages/CharacterPage/CharacterPage'));

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllCharacters(1));
    }, [dispatch]);
    return (
        <>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/character/:characterID" element={<CharacterPage/>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
