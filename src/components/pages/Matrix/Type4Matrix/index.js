import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {
    ROUTE__MATRIX_LAB,
    ROUTE__MATRIX_LABS,
    ROUTE__VECTOR_LAB,
    ROUTE__VECTOR_LABS
} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Latex from "react-latex";
import Select from "react-select";

const data = []

const description = "Составьте формулы для нахождения нижней, верхней цены и гарантированного выигрыша матричной игры на примере\nкоалиционной игры первого уровня."
const descriptionTaskOne = "Нижняя цена коалиционной игры s-того игрока против остальных определяется по формуле:"
const descriptionTaskTwo = "Верхняя цена коалиционной игры s-того игрока против остальных определяется по формуле:"
const descriptionTaskThree = "Гарантированны выигрыш коалиционной игры s-того игрока при его игре против остальных определяется по формуле:"
const descriptionMatrix = "Матрица дохода s-того игрока при его игре против остальных: "
const Type4Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(parseInt(location.pathname.split('/').pop()), result)
        navigation(`${ROUTE__MATRIX_LABS}/${parseInt(location.pathname.split('/').pop()) + 1}`)
        next()
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

    const formula1Starter = '$\\underline{v_s^1}$'

    const formula2Starter = '$\\overline{v_s^1}$'

    const formula3Starter = '$v_s^1$'

    const formulaEnder = '$a_{i_1,...,i_k}^s$'

    const formulaRadio1 = '$i_s$'

    const formulaRadio2 = '$\\left\\{i_1,...,i_{s-1},i_{s+1},...,i_k \\right\\}$'

    const optionsPart1 = [
        {
            value: 'max',
            label: 'max'
        },
        {
            value: 'min',
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
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 4</p>
            <p>{description}</p>
            <p>{descriptionTaskOne}</p>

            <div id="formula1" style={{display: "flex"}}>
                <p><Latex>{formula1Starter}</Latex></p>

                <div id="formula1part1-2">
                    <Select id={'select1-formula1-part1'} options={optionsPart1}/>
                    <p></p>
                    <Select id={'select1-formula1-part2'} options={optionsPart2}/>
                </div>

                <div id="formula1part3-4">
                    <Select id={'select1-formula1-part3'} options={optionsPart1}/>
                    <p></p>
                    <Select id={'select1-formula1-part4'} options={optionsPart2}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionTaskTwo}</p>

            <div id="formula2" style={{display: "flex"}}>
                <p><Latex>{formula2Starter}</Latex></p>

                <div id="formula2part1-2">
                    <Select id={'select1-formula2-part1'} options={optionsPart1}/>
                    <p></p>
                    <Select id={'select1-formula2-part2'} options={optionsPart2}/>
                </div>

                <div id="formula2part3-4">
                    <Select id={'select1-formula2-part3'} options={optionsPart1}/>
                    <p></p>
                    <Select id={'select1-formula2-part4'} options={optionsPart2}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionTaskThree}</p>

            <div id="formula3" style={{display: "flex"}}>
                <p><Latex>{formula3Starter}</Latex></p>

                <div id="formula3part1-2">
                    <Select id={'select1-formula3-part1'} options={optionsPart1}/>
                    <p></p>
                    <Select id={'select1-formula3-part2'} options={optionsPart2}/>
                </div>

                <div id="formula3part3-4">
                    <Select id={'select1-formula3-part3'} options={optionsPart1}/>
                    <p></p>
                    <Select id={'select1-formula3-part4'} options={optionsPart2}/>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionMatrix}</p>
            <Latex>{sampleMatrix}</Latex>
            <p></p>
            <Button variant='primary' style={{alignSelf: "self-end"}}
                    onClick={handleClick}>Проверить</Button>
        </div>
    );
};

export default observer(Type4Matrix);