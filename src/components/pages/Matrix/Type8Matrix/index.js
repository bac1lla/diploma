import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Latex from "react-latex";

const data = [
    ['', <>
        <div>B1</div>
    </>, <>
        <div>B2</div>
    </>, <>
        <div>B3</div>
    </>, <>
        <div>B4</div>
    </>,],
    ['A1', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>],
    ['A2', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>],
    ['A3', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>],
    ['A4', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>]
]

const description = "Найдите решение в смешанных стратегиях коалиционный игры вьторого уровня 1 и 2 игроков против остальных \n" +
    "(матричной игры игрока А против В (ввели обозначения А - коалиция 1 и 2 игроков, В - коалиция остальных игроков)). \n" +
    "Для этого: "
const descriptionTaskOne = "1. Выполните переход к преобразованной игре, задав число alpha >= 0. \n" +
    "(Преобразованная игра - игра с положительной матрицией (все ее элементы положительны) U: U = A + alpha * E, \n" +
    "где А - матрица исходной игры, Е - матрица размерности матрицы А с единичными элементами, alpha >= 0: U > 0)."
const descriptionTaskTwo = "2. Составьте две задачи линейного программирования (ЗЛП), к решению которыъ сводится решение преобразованной \n" +
    "игры в смешанных стратегиях."
const descriptionTaskThree = "3. По найденным решениям ЗЛП (X* и Y*) определите оптимальные смешанные стратегии игрока А - p \n" +
    "и игрока В - q и цену игры v"
const descriptionMatrix = "Матрица дохода s-того игрока при его игре против остальных: "

const matrixStarter = 'A = A_{1,2}^2 = (a_{1,2 i,j}^2)_{n*m} = '

const task1Ender = 'alpha:U=A+alpha*E>0(u_{i,j}>0);E=\\begin{pmatrix}\n' +
    '1 & ... & 1 \\\\\n' +
    '... & 1 & ... \\\\\n' +
    '1 & ... & 1\n' +
    '\\end{pmatrix}_{n*m}'

const task2part1formula1 = 'e_1=(1,...,1)^T\\inR'

const task2part1formula2 = 'e_2=(1,...,1)^T\\inR'

const Type8Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(parseInt(location.pathname.split('/').pop()), result)
        navigation(`${ROUTE__MATRIX_LABS}/${parseInt(location.pathname.split('/').pop()) + 1}`)
        next();
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 8</p>
            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>
            <p color="grey">{descriptionTaskThree}</p>
            <p color="grey">{descriptionMatrix}</p>
            <p>Матрица игры:</p>
            <Latex>{matrixStarter}</Latex>
            <Matrix matrix={data}></Matrix>

            <div id="task1">
                <p>Переход к преобразованной паре</p>
                <label for="task1answer">alpha =</label>
                <input type="text" id="task1answer"/>
                <label htmlFor="task1answer">; <Latex>{task1Ender}</Latex></label>

                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={handleClick} hidden="hidden">Проверить</Button>
            </div>

            <div id="task2">
                <p>Составление ЗЛП</p>
                <div>
                    <label for="task2part1formula1"><Latex>{task2part1formula1}</Latex></label>
                    <input type="text" id="task2part1formula1"/>

                    <label for="task2part2formula1">(</label>
                    <select id="task2part2formula1">
                        <option>e_1</option>
                        <option>e_2</option>
                    </select>
                    <label htmlFor="task2part2formula1">,X)-></label>
                    <select>
                        <option>max</option>
                        <option>min</option>
                    </select>
                    <label>X \\in R_x</label>

                    <label htmlFor="task2part3formula1">(</label>
                    <select id="task2part3formula1">
                        <option>e_1</option>
                        <option>e_2</option>
                    </select>
                    <label htmlFor="task2part3formula1">,Y)-></label>
                    <select>
                        <option>max</option>
                        <option>min</option>
                    </select>
                    <label>Y \\in R_y</label>

                    <p></p>

                    <label for="task2part1formula2"><Latex>{task2part1formula2}</Latex></label>
                    <input type="text" id="task2part1formula2"/>

                    <label htmlFor="task2part2formula2">R_X=X:</label>
                    <select id="task2part2formula1">
                        <option>U</option>
                        <option>U^T</option>
                    </select>
                    <label htmlFor="task2part2formula2">*X</label>
                    <select>
                        <option> more or = </option>
                        <option> less or = </option>
                    </select>
                    <select>
                        <option>e_1</option>
                        <option>e_2</option>
                    </select>
                    <label>,X</label>
                    <select>
                        <option>more or = </option>
                        <option>less or = </option>
                    </select>
                    <label>0></label>

                    <label htmlFor="task2part2formula2">R_Y=Y:</label>
                    <select id="task2part2formula1">
                        <option>U</option>
                        <option>U^T</option>
                    </select>
                    <label htmlFor="task2part2formula2">*Y</label>
                    <select>
                        <option> more or = </option>
                        <option> less or = </option>
                    </select>
                    <select>
                        <option>e_1</option>
                        <option>e_2</option>
                    </select>
                    <label>,Y</label>
                    <select>
                        <option>more or = </option>
                        <option>less or = </option>
                    </select>
                    <label>0></label>

                </div>
            </div>

            <div id="task3">
                <p>Решения ЗЛП</p>

                // toDO: данная матрицв

                <p>Решения исходной задачи</p>

                // toDO: матрица с инпутами и v

            </div>
        </div>
    );
};

export default observer(Type8Matrix);