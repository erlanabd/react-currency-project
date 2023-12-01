import React from "react";
import styles from './styles.module.scss';
import clsx from "clsx";

const AmountInput = (props) => {
    const {
        label,
        value,
        onChange,
        className,
        disabled
    } = props

    const handleDeletePlusMinus = (e) => {
        e.preventDefault()
    }

    const inputClassnames = clsx (
        styles['amount-wrap'],
        className
    )

    return (
        <div className={inputClassnames}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <input
                disabled={disabled}
                className={styles['input']}
                value={value}
                onChange={onChange}
                type="text"
                onInput={handleDeletePlusMinus}
            />
        </div>
    )
}

export default AmountInput