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
    </>, <>
        <div>2</div>
    </>],
    ['1  1  1', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['1  1  2', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['1  2  1', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['1  2  2', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['2  1  1', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['2  1  2', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['2  2  1', <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['2  2  2', <input style={{width: 50}}/>, <input style={{width: 50}}/>]
]

const description = "Сформулируйте матрицу коалиционной игры второго уровня 1, 2 и 3 игроков против 4. Для этого:"
const descriptionTaskOne = "Введите число строк (число стратегий коалиции 1, 2 и 3 игроков) и столбцов (число стратегий 4 игрока) матрицы"
const descriptionTaskTwo = "Заполните появившийся шаблон матрицы"
const Type3Matrix = ({next}) => {
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
            <p>Задание 3</p>
            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>

            <label>число строк</label>
            <input type="input"/>
            <label>число столбцов</label>
            <input type="input"/>

            <Button variant='primary' style={{alignSelf: "self-end"}}
                    onClick={handleClick}>Проверить</Button>

            <div hidden="hidden">
                <p>Стратегии коалиции 4 игрока</p>
                <Matrix matrix={data}>

                </Matrix>
                <Button variant='primary' style={{alignSelf: "self-end"}}
                        onClick={handleClick}>Проверить</Button>
            </div>
        </div>
    );
};

export default observer(Type3Matrix);