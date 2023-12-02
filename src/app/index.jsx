import React, {useEffect, useState} from "react";
import styles from './styles.module.scss';
import Button from "../components/button";
import CurrencySelect from "../components/currency-select";
import AmountInput from "../components/amount";
import {API, REQUEST_HEADERS} from "../api/endpoints";
import Loader from "../components/loader";
import CurrencyFlag from "../components/currency-flag";

function App() {

    const [fromOption, setFromOption] = useState(null)
    const [toOption, setToOption] = useState(null)
    const [amountInput, setAmountInput] = useState('');
    const [symbolsOptions, setSymbolsOptions] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [amountInputIsDisabled, setAmountInputIsDisabled] = useState(false);
    const [selectIsDisabled, setSelectIsDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(false);


    const getSymbols = async () => {



        try {
            setGlobalLoading(true)
            const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS)
            const data = await res.json()
            return data.symbols
        } catch {
            console.error('Error')
        } finally {
            setGlobalLoading(false)
        }

    }

    const handleConvertCurrency = async () => {
        if (!amountInput || !toOption || !fromOption) {
            return
        }
        try {
            setLoading(true);
            setButtonIsDisabled(true);
            setAmountInputIsDisabled(true);
            setSelectIsDisabled(true);
            setError(false)
            const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, amountInput), REQUEST_HEADERS)
            const data = await res.json()
            setResult(transformDataToObj(data))

        } catch {
            setError(true);
            console.error('Error')
        } finally {
            setLoading(false);
            setButtonIsDisabled(false);
            setAmountInputIsDisabled(false);
            setSelectIsDisabled(false);
            setAmountInput('')
        }
    }


    useEffect(() => {
        (async () => {
            const symbols = await getSymbols()
            const options = transformSymbolsDataToOptions(symbols)
            setSymbolsOptions(options)
        })()
    }, []);

    const transformSymbolsDataToOptions = (symbolsObj) => {
        return Object.keys(symbolsObj).map(item => {
            return {
                value: item,
                label: item
            }
        })
    }

    const transformDataToObj = (data) => {
        return {
            amount: data.query.amount,
            result: data.result,
            from: data.query.from,
            to: data.query.to
        }
    }

    const handleSwitchSelects = () => {
        setToOption(fromOption)
        setFromOption(toOption)
    }

    if (globalLoading) {
       return (
            <Loader isLoading={globalLoading}/>
        )
    }

    return (
        <>
            <div className={styles['currency-converter-wrap']}>
                <h1 className={styles['title']}>Currency Converter</h1>
                <AmountInput
                    disabled={amountInputIsDisabled}
                    label='Enter Amount'
                    value={amountInput}
                    onChange={e => setAmountInput(e.target.value)}
                />
                <div className={styles['custom-selects']}>
                    <CurrencySelect
                        isDisabled={selectIsDisabled}
                        className={styles['first']}
                        label='From'
                        value={fromOption}
                        onChange={val => setFromOption(val)}
                        options={symbolsOptions}
                    />

                    <div onClick={handleSwitchSelects} className={styles['swap-icon-wrap']}>
                        <i className={styles['swap-icon']}></i>
                    </div>

                    <CurrencySelect
                        isDisabled={selectIsDisabled}
                        label='To'
                        value={toOption}
                        onChange={val => setToOption(val)}
                        options={symbolsOptions}
                    />
                </div>
                {error && <div className={styles['error']}>Введите соответствующее число</div>}
                <Button
                    disabled={!amountInput || !fromOption || !toOption || buttonIsDisabled}
                    isLoading={loading}
                    onClick={handleConvertCurrency}
                    className={`${styles['convert-btn']}`}
                >
                    Convert

                </Button>



                {result && <div className={styles['result-wrap']}>
                    <span className={styles['result-wrap__text']}> Result: </span>
                    <span
                        className={styles['result-wrap__amount']}> {result.amount} {result.from} = {result.result} {result.to}</span>
                </div>}


            </div>

        </>

    );
}

export default App;
