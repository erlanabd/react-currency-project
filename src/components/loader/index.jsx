import React from "react";
import styles from './styles.module.scss';
import clsx from "clsx";

const Loader = (className) => {
    const loaderClassnames = clsx (
        styles['content'],
        styles['spinner'],
        className
    )
    return (
        <div className={loaderClassnames}>
            <div className={styles['content']}>
                <div className={styles['spinner']}>
                </div>
            </div>
        </div>

    )
}

export default Loader
