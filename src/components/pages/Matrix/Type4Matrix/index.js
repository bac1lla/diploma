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
import {show} from "react-modal/lib/helpers/ariaAppHider";

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
        labs.addResult(4, tries > 0 ? tries : 0)
        const nextStep = next()
        navigation(`${ROUTE__MATRIX_LABS}/${nextStep}`)
    }, [tries, labs, next])

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

    const valueToOption1 = (value) => {
        return optionsPart1.find(option => option.value == value)
    }
    const valueToOption2 = (value) => {
        return optionsPart2.find(option => option.value == value)
    }

    const showAnswers = () => {
        setValue1(valueToOption1(answers[0].answers[0]))
        setValue2(valueToOption2(answers[0].answers[1]))
        setValue3(valueToOption1(answers[0].answers[2]))
        setValue4(valueToOption2(answers[0].answers[3]))
        setValue5(valueToOption1(answers[0].answers[4]))
        setValue6(valueToOption2(answers[0].answers[5]))
        setValue7(valueToOption1(answers[0].answers[6]))
        setValue8(valueToOption2(answers[0].answers[7]))
        setValue9(valueToOption1(answers[0].answers[8]))
        setValue10(valueToOption2(answers[0].answers[9]))
        setValue11(valueToOption1(answers[0].answers[10]))
        setValue12(valueToOption2(answers[0].answers[11]))
    }


    const handleCheckSelect = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswers()
            setErrorValue1(false)
            setErrorValue2(false)
            setErrorValue3(false)
            setErrorValue4(false)
            setErrorValue5(false)
            setErrorValue6(false)
            setErrorValue7(false)
            setErrorValue8(false)
            setErrorValue9(false)
            setErrorValue10(false)
            setErrorValue11(false)
            setErrorValue12(false)
            return;
        }
        let error = false

        if (value1?.value !== answers[0].answers[0]) {
            setErrorValue1(true)
            error = true
        } else {
            setErrorValue1(false)
        }
        if (value2?.value !== answers[0].answers[1]) {
            setErrorValue2(true)
            error = true
        } else {
            setErrorValue2(false)
        }
        if (value3?.value !== answers[0].answers[2]) {
            setErrorValue3(true)
            error = true
        } else {
            setErrorValue3(false)
        }
        if (value4?.value !== answers[0].answers[3]) {
            setErrorValue4(true)
            error = true
        } else {
            setErrorValue4(false)
        }
        if (value5?.value !== answers[0].answers[4]) {
            setErrorValue5(true)
            error = true
        } else {
            setErrorValue5(false)
        }
        if (value6?.value !== answers[0].answers[5]) {
            setErrorValue6(true)
            error = true
        } else {
            setErrorValue6(false)
        }
        if (value7?.value !== answers[0].answers[6]) {
            setErrorValue7(true)
            error = true
        } else {
            setErrorValue7(false)
        }
        if (value8?.value !== answers[0].answers[7]) {
            setErrorValue8(true)
            error = true
        } else {
            setErrorValue8(false)
        }
        if (value9?.value !== answers[0].answers[8]) {
            setErrorValue9(true)
            error = true
        } else {
            setErrorValue9(false)
        }
        if (value10?.value !== answers[0].answers[9]) {
            setErrorValue10(true)
            error = true
        } else {
            setErrorValue10(false)
        }
        if (value11?.value !== answers[0].answers[10]) {
            setErrorValue11(true)
            error = true
        } else {
            setErrorValue11(false)
        }
        if (value12?.value !== answers[0].answers[11]) {
            setErrorValue12(true)
            error = true
        } else {
            setErrorValue12(false)
        }

        if (!error) {
            setSuccess(true);
            return;
        }

        setTries(prev => prev - 1)
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

    const formula1Starter = '$⊻_s^1 =$'

    const formula2Starter = '$⊽_s^1 =$'

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
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between',
            padding: '0 5% 1% 5%',
            overflow: 'auto',
            margin: 'auto',
        }}>
            <div className={'task-text-description-vector'} style={{alignSelf: 'flex-start'}}>{description}</div>
            <div className={'task-text-description-vector'} style={{alignSelf: 'flex-start'}}>{descriptionTaskOne}</div>
            <div id="formula1"
                 style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: 'center'}}>
                <p><Latex>{formula1Starter}</Latex></p>

                <div id="formula1part1-2">
                    <Select id={'select1-formula1-part1'} onChange={handleClick1} options={optionsPart1}
                            value={value1}
                            className={cx('type4Matrix-select', {error: errorValue1})}
                            placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula1-part2'} onChange={handleClick2} options={optionsPart2}
                            value={value2}
                            className={cx('type4Matrix-select', {error: errorValue2})}
                            placeholder={'Выберите ответ'}/>
                </div>

                <div id="formula1part3-4">
                    <Select id={'select1-formula1-part3'} onChange={handleClick3} options={optionsPart1}
                            value={value3}
                            className={cx('type4Matrix-select', {error: errorValue3})}
                            placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula1-part4'} onChange={handleClick4} options={optionsPart2}
                            value={value4}
                            className={cx('type4Matrix-select', {error: errorValue4})}
                            placeholder={'Выберите ответ'}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <div className={'task-text-description-vector'} style={{alignSelf: 'flex-start'}}>{descriptionTaskTwo}</div>

            <div id="formula2"
                 style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: 'center'}}>
                <p><Latex>{formula2Starter}</Latex></p>

                <div id="formula2part1-2">
                    <Select id={'select1-formula2-part1'} onChange={handleClick5} options={optionsPart1}
                            value={value5}
                            className={cx('type4Matrix-select', {error: errorValue5})}
                            placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula2-part2'} onChange={handleClick6} options={optionsPart2}
                            value={value6}
                            className={cx('type4Matrix-select', {error: errorValue6})}
                            placeholder={'Выберите ответ'}/>
                </div>

                <div id="formula2part3-4">
                    <Select id={'select1-formula2-part3'} onChange={handleClick7} options={optionsPart1}
                            value={value7}
                            className={cx('type4Matrix-select', {error: errorValue7})}
                            placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula2-part4'} onChange={handleClick8} options={optionsPart2}
                            value={value8}
                            className={cx('type4Matrix-select', {error: errorValue8})}
                            placeholder={'Выберите ответ'}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <div className={'task-text-description-vector'}
                 style={{alignSelf: 'flex-start'}}>{descriptionTaskThree}</div>

            <div id="formula3"
                 style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: 'center'}}>
                <p><Latex>{formula3Starter}</Latex></p>

                <div id="formula3part1-2">
                    <Select id={'select1-formula3-part1'} onChange={handleClick9} options={optionsPart1}
                            value={value9}
                            className={cx('type4Matrix-select', {error: errorValue9})}
                            placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula3-part2'} onChange={handleClick10} options={optionsPart2}
                            value={value10}
                            className={cx('type4Matrix-select', {error: errorValue10})}
                            placeholder={'Выберите ответ'}/>
                </div>

                <div id="formula3part3-4">
                    <Select id={'select1-formula3-part3'} onChange={handleClick11} options={optionsPart1}
                            value={value11}
                            className={cx('type4Matrix-select', {error: errorValue11})}
                            placeholder={'Выберите ответ'}/>
                    <p></p>
                    <Select id={'select1-formula3-part4'} onChange={handleClick12} options={optionsPart2}
                            value={value12}
                            className={cx('type4Matrix-select', {error: errorValue12})}
                            placeholder={'Выберите ответ'}/>
                </div>

                <p style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: 'center'}}>
                    <Latex>{formulaEnder}</Latex></p>
            </div>

            <div className={'task-text-description-vector'} style={{alignSelf: 'flex-start'}}>{descriptionMatrix}</div>
            <p style={{display: "flex", alignItems: "center", gap: "20px", justifyContent: 'center'}}>
                <Latex>{sampleMatrix}</Latex></p>
            <div
                style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>

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
        </div>
    );
};

export default observer(Type4Matrix);
