import React from "react";
import styles from './styles.module.scss';
import clsx from "clsx";

const Loader = (props) => {
 const    {
        isLoading
    } = props

    const loaderClassnames = clsx (
        {
            [styles['active-loader']] : isLoading
        }
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
