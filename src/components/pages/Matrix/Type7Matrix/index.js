import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";

const data = [
    ['', <>
        <div>β1</div>
    </>, <>
        <div>β2</div>
    </>,],
    ['α1', 'value', 'value'],
    ['α2', 'value', 'value'],
    ['α3', 'value', 'value'],
    ['α4', 'value', 'value', <input style={{width: 50}}/>, 'β'],
    ['α5', 'value', 'value', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['α6', 'value', 'value'],
    ['α7', 'value', 'value'],
    ['α8', 'value', 'value'],
    ['', <input id={'alpha1'} style={{width: 50}}/>, <input id={'alpha2'} style={{width: 50}}/>],
    ['', 'α', <input id={'alpha'} style={{width: 50}}/>, '']
]

const description = "Найдите верхнюю, нижнюю цены игры и гарантированный выигрыш для коалиционной игры первого уровня 1 игрока \n против остальных и укажите, существует ли решение в чистых стратегиях, или нет. \n        Для этого:"
const descriptionTaskOne = "1. Заполните столбец α (столбец минимумов строк: α = min α ) и строку β  (строка максимумов столбцов: β = max α ),\nпосле чего найдите максимальное из чисел α : α = max α и минимальное из чисел β : β = β ."
const descriptionTaskTwo = "2. Введите значения нижней, верхней цены игры и гарантированного выигрыша в соответствующие поля и укажите, \nсуществует ли решение игры в чистых стратегиях. "
const descriptionMatrix = "Стратегии коалиции 2, 3 и 4 игроков"
const Type7Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(7, result)
        navigation(`${ROUTE__MATRIX_LABS}/8`)
        next()
    }

    return (
        <div style={{
            width: '75%',
            height: '100%',
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 7</p>

            // FIXME: изменять цвет текста при переходе к некст пункту

            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>
            <p>{descriptionMatrix}</p>
            <div style={{display: "flex", alignItems: "center"}}>
                <Matrix matrix={data} style={{width: "60%"}}>

                </Matrix>

                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={handleClick}>Проверить</Button>
                <div>
                    <Matrix matrix={[
                        [<label htmlFor="task2part1">Нижняя цена игры</label>, <input type="text" id="task2part1" style={{width: 50}}/>],
                        [<label htmlFor="task2part2">Верхняя цена игры</label>, <input type="text" id="task2part2" style={{width: 50}}/>],
                        [<label htmlFor="task2part2">Гарантированный выигрыш</label>, <input type="text" id="task2part2" style={{width: 50}}/>],
                        [<p>Решение в чистых стратегиях:</p>, <div style={{display: "flex", gap: 5}}><input type="radio" name="task2part3" id={'task2part31'}/><label htmlFor="task2part31">существует</label></div>],
                        ['', <div style={{display: "flex", gap: 5}}><input type="radio" name="task2part3" id={'task2part32'}/><label htmlFor="task2part31">не существует</label></div>]
                    ]}/>

                    <Button variant='primary' style={{alignSelf: "self-end"}}
                            onClick={handleClick}>Проверить</Button>
                </div>
            </div>
        </div>
    );
};

export default observer(Type7Matrix);