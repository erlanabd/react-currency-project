import React from "react";
import Select, {defaultTheme} from "react-select";
import styles from './styles.module.scss'
import clsx from "clsx";
import CurrencyFlag from "../currency-flag";


const CurrencySelect = (props) => {
    const {
        value,
        onChange,
        options,
        label,
        className,
        isDisabled
    } = props

    const selectClassnames = clsx (
        styles['select-wrap'],
        className
    )

    const formatOptionLabel = (option) => {
        return (
            <div className={styles['custom-option']}>
                <CurrencyFlag width={15} height={13} currency={option.value}/>
                <div className={styles['label']}>{option.label}</div>
            </div>
        )
    }

    return (
        <div className={selectClassnames}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <Select
                isDisabled={isDisabled}
                classNamePrefix={'custom-select'}
                className={styles['select']}
                value={value}
                onChange={onChange}
                options={options}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    )
}

export default CurrencySelect