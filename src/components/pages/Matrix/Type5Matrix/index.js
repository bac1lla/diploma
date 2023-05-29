import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";

const data = [
    ['', <>
        <div>b1</div>
    </>, <>
        <div>b2</div>
    </>, <>
        <div>b3</div>
    </>, <>
        <div>b4</div>
    </>, <>
        <div>b5</div>
    </>, <>
        <div>b6</div>
    </>, <>
        <div>b7</div>
    </>, <>
        <div>b8</div>
    </>,],
    ['a1', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <input style={{width: 50}}/>, 'b'],
    ['a2', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['', <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['', '', '', '', 'a', <input style={{width: 50}}/>]
]

const description = "Найдите верхнюю, нижнюю цены игры и гарантированный выигрыш для коалиционной игры первого уровня 1 игрока \n против остальных и укажите, существует ли решение в чистых стратегиях, или нет. \n        Для этого:"
const descriptionTaskOne = "1. Заполните столбец α (столбец минимумов строк: α = min α ) и строку β  (строка максимумов столбцов: β = max α ),\nпосле чего найдите максимальное из чисел α : α = max α и минимальное из чисел β : β = β ."
const descriptionTaskTwo = "2. Введите значения нижней, верхней цены игры и гарантированного выигрыша в соответствующие поля и укажите, \nсуществует ли решение игры в чистых стратегиях. "
const descriptionMatrix = "Стратегии коалиции 2, 3 и 4 игроков"
const Type5Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(parseInt(location.pathname.split('/').pop()), result)
        navigation(`${ROUTE__MATRIX_LABS}/${parseInt(location.pathname.split('/').pop()) + 1}`)
        next()
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
            <p>Задание 5</p>
            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>
            <p>{descriptionMatrix}</p>
            <div>
                <Matrix matrix={data}>

                </Matrix>

                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={handleClick}>Проверить</Button>
            </div>
            <div>
                <div>
                    <label htmlFor="task2part1">Нижняя цена игры</label>
                    <input type="text" id="task2part1"/>
                </div>
                <div>
                    <label htmlFor="task2part2">Верхняя цена игры</label>
                    <input type="text" id="task2part2"/>
                </div>
                <div>
                    <label htmlFor="task2part2">Гарантированный выигрыш</label>
                    <input type="text" id="task2part2"/>
                </div>
                <div>
                    <p>Решение в чистых стратегиях:</p>
                    <input type="radio" name="task2part3" id="task2part31"/>
                    <label for="task2part31">Существует</label>
                    <p></p>
                    <input type="radio" name="task2part3" id="task2part32"/>
                    <label htmlFor="task2part32">Не существует</label>
                </div>

                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={handleClick}>Проверить</Button>
            </div>
        </div>
    );
};

export default observer(Type5Matrix);