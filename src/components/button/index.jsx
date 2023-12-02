import React from "react";
import styles from './styles.module.scss';
import clsx from "clsx";
import Loader from "../loader";

const Button = (props) => {
    const {
        children,
        className,
        onClick,
        type = 'button',
        disabled,
        isLoading
    } = props

    const mainClasses = clsx (
        className,
        styles.button,
        {
            [styles['disabled-btn']]: disabled
        }
    )

    return (
        <div className={styles['button-wrap']}>
            <button
                disabled={disabled}
                onClick={onClick}
                type={type}
                className={mainClasses}
            >
                {isLoading && <Loader/>}
                {children}
            </button>

        </div>

    )

}

export default Button