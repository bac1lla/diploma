import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Latex from "react-latex";

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

    const sampleMatrix = '\\left(\n' +
        '\\begin{matrix}\n' +
        ' a_{1,...,1,1,1,...,1}^s  &  a_{1,...,1,1,1,...,2}^s & ... & a_{n_1,...,n_{s-1},1,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},1,n_{s+1},...,n_{k}}^s\\\\\n' +
        ' a_{1,...,1,2,1,...,1}^s  &  a_{1,...,1,2,1,...,2}^s & ... & a_{n_1,...,n_{s-1},2,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},2,n_{s+1},...,n_{k}}^s \\\\\n' +
        ' ... &  ... & ... & ... & ... \\\\\n' +
        ' a_{1,...,1,n_s-1,1,...,1}^s  &  a_{1,...,1,n_s-1,1,...,2}^s & ... & a_{n_1,...,n_{s-1},n_s-1,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},n_s-1,n_{s+1},...,n_{k}}^s \\\\\n' +
        ' a_{1,...,1,n_s,1,...,1}^s  &  a_{1,...,1,n_s,1,...,2}^s & ... & a_{n_1,...,n_{s-1},n_s,n_{s+1},...,n_{k}-1}^s & a_{n_1,...,n_{s-1},n_s,n_{s+1},...,n_{k}}^s \\\\\n' +
        '\\end{matrix}\n' +
        '\\right)'

    const formula1Starter = '\\underline{v_s^1}'

    const formula2Starter = '\\overline{v_s^1}'

    const formula3Starter = 'v_s^1'

    const formulaEnder = 'a_{i_1,...,i_k}^s'

    const formulaRadio1 = 'i_s'

    const formulaRadio2 = '\\left\\{i_1,...,i_{s-1},i_{s+1},...,i_k \\right\\}'

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
                    <select>
                        <option id="formula1part1option1">max</option>
                        <option id="formula1part1option2">min</option>
                    </select>
                    <p></p>
                    <select>
                        <option id="formula1part2option1"><Latex>{formulaRadio1}</Latex></option>
                        <option id="formula1part2option2"><Latex>{formulaRadio2}</Latex></option>
                    </select>
                </div>

                <div id="formula1part3-4">
                    <select>
                        <option id="formula1part3option1">max</option>
                        <option id="formula1part3option2">min</option>
                    </select>
                    <p></p>
                    <select>
                        <option id="formula1part4option1"><Latex>{formulaRadio1}</Latex></option>
                        <option id="formula1part4option2"><Latex>{formulaRadio2}</Latex></option>
                    </select>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionTaskTwo}</p>

            <div id="formula2" style={{display: "flex"}}>
                <p><Latex>{formula2Starter}</Latex></p>

                <div id="formula2part1-2">
                    <select>
                        <option id="formula2part1option1">max</option>
                        <option id="formula2part1option2">min</option>
                    </select>
                    <p></p>
                    <select>
                        <option id="formula2part2option1"><Latex>{formulaRadio1}</Latex></option>
                        <option id="formula2part2option2"><Latex>{formulaRadio2}</Latex></option>
                    </select>
                </div>

                <div id="formula2part3-4">
                    <select>
                        <option id="formula2part3option1">max</option>
                        <option id="formula2part3option2">min</option>
                    </select>
                    <p></p>
                    <select>
                        <option id="formula2part4option1"><Latex>{formulaRadio1}</Latex></option>
                        <option id="formula2part4option2"><Latex>{formulaRadio2}</Latex></option>
                    </select>
                </div>

                <p><Latex>{formulaEnder}</Latex></p>
            </div>

            <p>{descriptionTaskThree}</p>

            <div id="formula3" style={{display: "flex"}}>
                <p><Latex>{formula3Starter}</Latex></p>

                <div id="formula3part1-2">
                    <select>
                        <option id="formula3part1option1">max</option>
                        <option id="formula3part1option2">min</option>
                    </select>
                    <p></p>
                    <select>
                        <option id="formula3part2option1"><Latex>{formulaRadio1}</Latex></option>
                        <option id="formula3part2option2"><Latex>{formulaRadio2}</Latex></option>
                    </select>
                </div>

                <div id="formula3part3-4">
                    <select>
                        <option id="formula3part1option1">max</option>
                        <option id="formula3part1option2">min</option>
                    </select>
                    <p></p>
                    <select>
                        <option id="formula4part2option1"><Latex>{formulaRadio1}</Latex></option>
                        <option id="formula4part2option2"><Latex>{formulaRadio2}</Latex></option>
                    </select>
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