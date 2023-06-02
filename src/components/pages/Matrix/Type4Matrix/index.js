import classNames from "classnames/bind";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Latex from "react-latex";
import Select from "react-select";
import styles from "./styles.css"
import {answers} from './answers'

const cx = classNames.bind(styles)
const description = "Составьте формулы для нахождения нижней, верхней цены и гарантированного выигрыша матричной игры на примере\nкоалиционной игры первого уровня."
const descriptionTaskOne = "Нижняя цена коалиционной игры s-того игрока против остальных определяется по формуле:"
const descriptionTaskTwo = "Верхняя цена коалиционной игры s-того игрока против остальных определяется по формуле:"
const descriptionTaskThree = "Гарантированный выигрыш коалиционной игры s-того игрока при его игре против остальных определяется по формуле:"
const descriptionMatrix = "Матрица дохода s-того игрока при его игре против остальных: "
const Type4Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const navigation = useNavigate();
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);
    const [value1, setValue1] = useState()
    const [value2, setValue2] = useState()
    const [value3, setValue3] = useState()
    const [value4, setValue4] = useState()
    const [value5, setValue5] = useState()
    const [value6, setValue6] = useState()
    const [value7, setValue7] = useState()
    const [value8, setValue8] = useState()
    const [value9, setValue9] = useState()
    const [value10, setValue10] = useState()
    const [value11, setValue11] = useState()
    const [value12, setValue12] = useState()

    const [errorValue1, setErrorValue1] = useState(false)
    const [errorValue2, setErrorValue2] = useState(false)
    const [errorValue3, setErrorValue3] = useState(false)
    const [errorValue4, setErrorValue4] = useState(false)
    const [errorValue5, setErrorValue5] = useState(false)
    const [errorValue6, setErrorValue6] = useState(false)
    const [errorValue7, setErrorValue7] = useState(false)
    const [errorValue8, setErrorValue8] = useState(false)
    const [errorValue9, setErrorValue9] = useState(false)
    const [errorValue10, setErrorValue10] = useState(false)
    const [errorValue11, setErrorValue11] = useState(false)
    const [errorValue12, setErrorValue12] = useState(false)


    const handleClickNext = useCallback(() => {
        labs.addResult(3, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/5`)
        next()
    }, [tries])

    const handleClick1 = useCallback(option => {
        setValue1(option)
    }, [])
    const handleClick2 = useCallback(option => {
        setValue2(option)
    }, [])
    const handleClick3 = useCallback(option => {
        setValue3(option)
    }, [])
    const handleClick4 = useCallback(option => {
        setValue4(option)
    }, [])
    const handleClick5 = useCallback(option => {
        setValue5(option)
    }, [])
    const handleClick6 = useCallback(option => {
        setValue6(option)
    }, [])
    const handleClick7 = useCallback(option => {
        setValue7(option)
    }, [])
    const handleClick8 = useCallback(option => {
        setValue8(option)
    }, [])
    const handleClick9 = useCallback(option => {
        setValue9(option)
    }, [])
    const handleClick10 = useCallback(option => {
        setValue10(option)
    }, [])
    const handleClick11 = useCallback(option => {
        setValue11(option)
    }, [])
    const handleClick12 = useCallback(option => {
        setValue12(option)
    }, [])


    const handleCheckSelect = () => {
        console.log(value1)

        if (value1?.value != answers[0].answers[0]) {
            setErrorValue1(true)
        }
    }

    const sampleMatrix = '$\\left(\n' +
        '\\begin{matrix}\n' +
        ' a_{1,...,1,1,1,...,1}^s  &  a_{1,...,1,1,1,...,2}^s & ... & a_{n_1,...,n_{s-1},1,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},1,n_{s+1},...,n_{k}}^s\\\\\n' +
        ' a_{1,...,1,2,1,...,1}^s  &  a_{1,...,1,2,1,...,2}^s & ... & a_{n_1,...,n_{s-1},2,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},2,n_{s+1},...,n_{k}}^s \\\\\n' +
        ' ... &  ... & ... & ... & ... \\\\\n' +
        ' a_{1,...,1,n_s-1,1,...,1}^s  &  a_{1,...,1,n_s-1,1,...,2}^s & ... & a_{n_1,...,n_{s-1},n_s-1,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},n_s-1,n_{s+1},...,n_{k}}^s \\\\\n' +
        ' a_{1,...,1,n_s,1,...,1}^s  &  a_{1,...,1,n_s,1,...,2}^s & ... & a_{n_1,...,n_{s-1},n_s,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},n_s,n_{s+1},...,n_{k}}^s \\\\\n' +
        '\\end{matrix}\n' +
        '\\right)$'

    const formula1Starter = '$\\underline{v_s^1} =$'

    const formula2Starter = '$\\overline{v_s^1} =$'

    const formula3Starter = '$v_s^1 =$'

    const formulaEnder = '$a_{i_1,...,i_k}^s$'

    const formulaRadio1 = '$i_s$'

    const formulaRadio2 = '$\\left\\{i_1,...,i_{s-1},i_{s+1},...,i_k \\right\\}$'

    const optionsPart1 = [
        {
            value: '1',
            label: 'max'
        },
        {
            value: '2',
            label: 'min'
        },
    ]

    const optionsPart2 = [
        {
            value: '1',
            label: <Latex>{formulaRadio1}</Latex>
        },
        {
            value: '2',
            label: <Latex>{formulaRadio2}</Latex>
        },
    ]

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            margin: "auto",
            gap: "10px",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p style={{alignSelf: "flex-start"}}>Задание 4</p>
            <p style={{alignSelf: "flex-start"}}>{description}</p>

            <p>{descriptionTaskOne}</p>
            <div id="formula1" style={{display: "flex", alignItems: "center", gap: "20px"}}>
                <p><Latex>{formula1Starter}</Latex></p>

                <div id="formula1part1-2">
                    <Select id={'select1-formula1-part1'} onChange={handleClick1} options={optionsPart1} value={value1}
                            className={cx('type4Matrix-select', {error: errorValue1})} placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula1-part2'} onChange={handleClick2} options={optionsPart2} value={value2}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                </div>

                <div id="formula1part3-4">
                    <Select id={'select1-formula1-part3'} onChange={handleClick3} options={optionsPart1} value={value3}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula1-part4'} onChange={handleClick4} options={optionsPart2} value={value4}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionTaskTwo}</p>

            <div id="formula2" style={{display: "flex", alignItems: "center", gap: "20px"}}>
                <p><Latex>{formula2Starter}</Latex></p>

                <div id="formula2part1-2">
                    <Select id={'select1-formula2-part1'} onChange={handleClick5} options={optionsPart1} value={value5}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula2-part2'} onChange={handleClick6} options={optionsPart2} value={value6}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                </div>

                <div id="formula2part3-4">
                    <Select id={'select1-formula2-part3'} onChange={handleClick7} options={optionsPart1} value={value7}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula2-part4'} onChange={handleClick8} options={optionsPart2} value={value8}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionTaskThree}</p>

            <div id="formula3" style={{display: "flex", alignItems: "center", gap: "20px"}}>
                <p><Latex>{formula3Starter}</Latex></p>

                <div id="formula3part1-2">
                    <Select id={'select1-formula3-part1'} onChange={handleClick9} options={optionsPart1} value={value9}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula3-part2'} onChange={handleClick10} options={optionsPart2}
                            value={value10}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                </div>

                <div id="formula3part3-4">
                    <Select id={'select1-formula3-part3'} onChange={handleClick11} options={optionsPart1}
                            value={value11}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula3-part4'} onChange={handleClick12} options={optionsPart2}
                            value={value12}
                            className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionMatrix}</p>
            <Latex>{sampleMatrix}</Latex>
            <p></p>
            {
                success &&
                <Button variant='primary' style={{alignSelf: "self-end"}} onClick={handleClickNext}>
                    Далее
                </Button>
            }
            {
                !success &&
                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={handleCheckSelect}>
                    {tries > 0 ? "Проверить" : "Показать ответы"}
                </Button>
            }
        </div>
    );
};

export default observer(Type4Matrix);