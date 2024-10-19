import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import style from './SharedLayout.module.css'

export default function SharedLayout() {
    return (
        <>
            <div className={style.container}>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </div>
            <Toaster />
        </>
    );
}


