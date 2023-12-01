import React from "react";
import Select, {defaultTheme} from "react-select";
import styles from './styles.module.scss'
import clsx from "clsx";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const CustomSelect = (props) => {
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
            />
        </div>
    )
}

export default CustomSelect