import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';

const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const CharacterPage = lazy(() => import('pages/CharacterPage/CharacterPage'));

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<MainPage />} />
                    <Route
                        path="/character/:characterID"
                        element={<CharacterPage />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
