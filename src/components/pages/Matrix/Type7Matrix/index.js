import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";

const data = []

const description = "Составьте формулы для нахождения нижней, верхней цены и гарантированного выигрыша матричной игры на примере\nкоалиционной игры первого уровня."
const descriptionTaskOne = "Нижняя цена коалиционной игры s-того игрока против остальных определяется по формуле:"
const descriptionTaskTwo = "Верхняя цена коалиционной игры s-того игрока против остальных определяется по формуле:"
const descriptionTaskThree = "Гарантированны выигрыш коалиционной игры s-того игрока при его игре против остальных определяется по формуле:"
const descriptionMatrix = "Матрица дохода s-того игрока при его игре против остальных: "
const Type7Matrix = () => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);

    const handleClick = () => {
        labs.addResult(parseInt(location.pathname.split('/').pop()), result)
        navigation(`${ROUTE__MATRIX_LABS}/${parseInt(location.pathname.split('/').pop()) + 1}`)
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
            <p>Задание 7</p>
            <p>{description}</p>
            <p>{descriptionTaskOne}</p>

            // toDO: формула через чекбоксы

            <p>{descriptionTaskTwo}</p>

            // toDO: формула через чекбоксы

            <p>{descriptionTaskThree}</p>

            // toDO: формула через чекбоксы

            <p>{descriptionMatrix}</p>

            // toDO: красивая матрица

            <Button variant='primary' style={{alignSelf: "self-end"}}
                    onClick={handleClick} hidden="hidden">Проверить</Button>
        </div>
    );
};

export default observer(Type7Matrix);