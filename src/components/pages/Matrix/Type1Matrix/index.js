import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";

const data = [
    ['', <>
        <div>1</div>
        <div>1</div>
        <div>1</div>
    </>, <>
        <div>1</div>
        <div>1</div>
        <div>2</div>
    </>, <>
        <div>1</div>
        <div>2</div>
        <div>1</div>
    </>, <>
        <div>1</div>
        <div>2</div>
        <div>2</div>
    </>, <>
        <div>2</div>
        <div>1</div>
        <div>1</div>
    </>, <>
        <div>2</div>
        <div>1</div>
        <div>2</div>
    </>, <>
        <div>2</div>
        <div>2</div>
        <div>1</div>
    </>, <>
        <div>2</div>
        <div>2</div>
        <div>2</div>
    </>,],
    ['1', <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['2', <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>]
]

const description = "Сформулируйте матрицу коалиционной игры первого уровня 1 игрока против остальных. Для этого:"
const descriptionTaskOne = "Введите число строк (число стратегий 1 игрока) и столбцов (число стратегий коалиции остальных игроков) матрицы"
const descriptionTaskTwo = "Заполните появившийся шаблон матрицы"
const Type1Matrix = () => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(parseInt(location.pathname.split('/').pop()), result)
        navigation(`${ROUTE__MATRIX_LABS}/${parseInt(location.pathname.split('/').pop()) + 1}`)
    }

    const checkTaskOne = () => {
        if (document.getElementById("rows").value === "2" && document.getElementById("cols").value === "8") {
            document.getElementById("task_2").hidden = false;
            alert("u r right, keep it up")
        }
        if (document.getElementById("rows").value !== "2" && document.getElementById("cols").value === "8") {
            alert("rows are not right, u suck some dick")
        }
        if (document.getElementById("rows").value === "2" && document.getElementById("cols").value !== "8") {
            alert("cols are not right, u suck some dick")
        }
        if (document.getElementById("rows").value !== "2" && document.getElementById("cols").value !== "8") {
            alert("u totally suck some dick")
        }
    }

    const checkTaskTwo = () => {
        handleClick()
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
            <p>Задание 1</p>
            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>
            <label>число строк</label>
            <input type="text" id="rows"/>
            <label>число столбцов</label>
            <input type="text" id="cols"/>

            <Button variant='primary' style={{alignSelf: "self-end"}}
                    onClick={checkTaskOne}>Проверить</Button>

            <div id="task_2" hidden="true">
                <p>Стратегии коалиции 2, 3 и 4 игроков</p>
                <Matrix matrix={data}>

                </Matrix>
                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={checkTaskTwo}>Проверить</Button>
            </div>
        </div>
    );
};

export default observer(Type1Matrix);