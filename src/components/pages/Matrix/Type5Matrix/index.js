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
    </>, <>
        <div>β3</div>
    </>, <>
        <div>β4</div>
    </>, <>
        <div>β5</div>
    </>, <>
        <div>β6</div>
    </>, <>
        <div>β7</div>
    </>, <>
        <div>β8</div>
    </>,],
    ['α1', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <input id={'beta1'} style={{width: 50}}/>, 'β'],
    ['α2', <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>,
        <label style={{width: 50}}>value</label>, <label style={{width: 50}}>value</label>,
        <input id={'beta2'} style={{width: 50}}/>, <input id={'beta'} style={{width: 50}}/>],
    ['', <input id={'alpha1'} style={{width: 50}}/>, <input id={'alpha2'} style={{width: 50}}/>, <input id={'alpha3'} style={{width: 50}}/>,
        <input id={'alpha4'} style={{width: 50}}/>, <input id={'alpha5'} style={{width: 50}}/>, <input id={'alpha6'} style={{width: 50}}/>,
        <input id={'alpha7'} style={{width: 50}}/>, <input id={'alpha8'} style={{width: 50}}/>],
    ['', '', '', '', 'α', <input id={'alpha'} style={{width: 50}}/>]
]

const description = "Найдите верхнюю, нижнюю цены игры и гарантированный выигрыш для коалиционной игры первого уровня 1 игрока \n против остальных и укажите, существует ли решение в чистых стратегиях, или нет. \n        Для этого:"
const descriptionTaskOne = "1. Заполните столбец α (столбец минимумов строк: α = min α ) и строку β (строка максимумов столбцов: β = max α ),\nпосле чего найдите максимальное из чисел α : α = max α и минимальное из чисел β : β = β ."
const descriptionTaskTwo = "2. Введите значения нижней, верхней цены игры и гарантированного выигрыша в соответствующие поля и укажите, \nсуществует ли решение игры в чистых стратегиях. "
const descriptionMatrix = "Стратегии коалиции 2, 3 и 4 игроков"
const Type5Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(5, result)
        navigation(`${ROUTE__MATRIX_LABS}/6`)
        next()
    }

    const checkTaskOne = () => {
        if (document.getElementById("alpha1").value === "2" && document.getElementById("alpha2").value === "8") {
            document.getElementById("task2").hidden = false;
            document.getElementById("alpha").readOnly = true;
            for (let i = 1; i < 9; i++) {
                document.getElementById("alpha" + i).readOnly = true;
            }
            document.getElementById("beta1").readOnly = true;
            document.getElementById("beta2").readOnly = true;
            document.getElementById("check1").hidden = true;

        }
        if (document.getElementById("alpha1").value !== "2" && document.getElementById("alpha2").value === "8") {
            alert("rows are not right, u suck some dick")
        }
        if (document.getElementById("alpha1").value === "2" && document.getElementById("alpha2").value !== "8") {
            alert("cols are not right, u suck some dick")
        }
        if (document.getElementById("alpha1").value !== "2" && document.getElementById("alpha2  ").value !== "8") {
            alert("u totally suck some dick")
        }
    }

    const checkTaskTwo = () => {
        handleClick()
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
            <p>Задание 5</p>
            <p>{description}</p>

            // FIXME: изменять цвет текста при переходе к некст пункту

            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>
            <p>{descriptionMatrix}</p>
            <div style={{display: "flex", alignItems: "center"}}>
                <div>
                    <Matrix matrix={data}>

                    </Matrix>

                    <Button id={'check1'} variant='primary' style={{alignSelf: "self-end"}}
                            onClick={checkTaskOne}>Проверить</Button>
                </div>
                <div id={'task2'} hidden={true} style={{marginLeft: "60px"}}>
                    <Matrix matrix={[
                        [<label htmlFor="task2part1">Нижняя цена игры</label>, <input type="text" id="task2part1" style={{width: 50}}/>],
                        [<label htmlFor="task2part2">Верхняя цена игры</label>, <input type="text" id="task2part2" style={{width: 50}}/>],
                        [<label htmlFor="task2part2">Гарантированный выигрыш</label>, <input type="text" id="task2part2" style={{width: 50}}/>],
                        [<p>Решение в чистых стратегиях:</p>, <div style={{display: "flex", gap: 5}}><input type="radio" name="task2part3" id={'task2part31'}/><label htmlFor="task2part31">существует</label></div>],
                        ['', <div style={{display: "flex", gap: 5}}><input type="radio" name="task2part3" id={'task2part32'}/><label htmlFor="task2part31">не существует</label></div>]
                    ]}/>

                    <Button variant='primary' style={{alignSelf: "self-end"}}
                            onClick={checkTaskTwo}>Проверить</Button>
                </div>
            </div>
        </div>
    );
};

export default observer(Type5Matrix);