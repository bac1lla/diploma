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
    const [value, setValue] = useState()

    const handleClickNext = useCallback(() => {
        labs.addResult(3, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/5`)
        next()
    }, [tries])

    const handleClick = useCallback(option => {
        setValue(option.value)
    }, [])

    const handleCheckSelect = () => {
        if (value.value == answers?.answers[0]) {
            console.log(123)
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
            width: '75%',
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
                        <Select id={'select1-formula1-part1'} onChange={handleClick} options={optionsPart1} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                        <p></p>
                        <Select id={'select1-formula1-part2'} onChange={handleClick} options={optionsPart2} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    </div>

                    <div id="formula1part3-4">
                        <Select id={'select1-formula1-part3'} onChange={handleClick} options={optionsPart1} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                        <p></p>
                        <Select id={'select1-formula1-part4'} onChange={handleClick} options={optionsPart2} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    </div>

                    <p><Latex>{formulaEnder}</Latex></p>
                </div>

                <p>{descriptionTaskTwo}</p>

                <div id="formula2" style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <p><Latex>{formula2Starter}</Latex></p>

                    <div id="formula2part1-2">
                        <Select id={'select1-formula2-part1'} onChange={handleClick} options={optionsPart1} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                        <p></p>
                        <Select id={'select1-formula2-part2'} onChange={handleClick}  options={optionsPart2} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    </div>

                    <div id="formula2part3-4">
                        <Select id={'select1-formula2-part3'} onChange={handleClick} options={optionsPart1} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                        <p></p>
                        <Select id={'select1-formula2-part4'} onChange={handleClick} options={optionsPart2} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    </div>

                    <p><Latex>{formulaEnder}</Latex></p>
                </div>

                <p>{descriptionTaskThree}</p>

                <div id="formula3" style={{display: "flex", alignItems: "center", gap: "20px"}}>
                    <p><Latex>{formula3Starter}</Latex></p>

                    <div id="formula3part1-2">
                        <Select id={'select1-formula3-part1'} onChange={handleClick} options={optionsPart1} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                        <p></p>
                        <Select id={'select1-formula3-part2'} onChange={handleClick} options={optionsPart2} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                    </div>

                    <div id="formula3part3-4">
                        <Select id={'select1-formula3-part3'} onChange={handleClick} options={optionsPart1} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
                        <p></p>
                        <Select id={'select1-formula3-part4'} onChange={handleClick}  options={optionsPart2} className={'type4Matrix-select'} placeholder={'Выберите ответ'}/>
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