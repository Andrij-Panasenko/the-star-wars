import React, { ReactNode } from 'react';
import style from './Button.module.css';

export interface ButtonProps
    extends Partial<React.ButtonHTMLAttributes<HTMLButtonElement>> {
    children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
    return (
        <>
            <button {...rest} className={style.load_btn}>
                <span className={style.load_btn__text}>{children}</span>
            </button>
        </>
    );
}
