import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";

const data = [
    ['', <>
        <div>g1(x) -> min</div>
        <div>g2(x) -> min</div>
        <div>g3(x) -> min</div>
    </>, <>
        <div>g1(x) -> min</div>
        <div>g2(x) -> min</div>
        <div>g3(x) -> max</div>
    </>, <>
        <div>g1(x) -> min</div>
        <div>g2(x) -> max</div>
        <div>g3(x) -> min</div>
    </>, <>
        <div>g1(x) -> min</div>
        <div>g2(x) -> max</div>
        <div>g3(x) -> max</div>
    </>, <>
        <div>g1(x) -> max</div>
        <div>g2(x) -> min</div>
        <div>g3(x) -> min</div>
    </>, <>
        <div>g1(x) -> max</div>
        <div>g2(x) -> min</div>
        <div>g3(x) -> max</div>
    </>, <>
        <div>g1(x) -> max</div>
        <div>g2(x) -> max</div>
        <div>g3(x) -> min</div>
    </>, <>
        <div>g1(x) -> max</div>
        <div>g2(x) -> max</div>
        <div>g3(x) -> max</div>
    </>,],
    ['По Парето', <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>],
    ['По Слейтеру', <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>, <input style={{width: 50}}/>,
        <input style={{width: 50}}/>, <input style={{width: 50}}/>]
]

const description = "Для критериев g1(x), g2(x) и g3(x), найдите области эффективных векторных оценок на множестве X={x1, x2, x3}, для всех предложенных задач"
const explanation = "Пример ввода: 1,4,5"
const Type2 = () => {
    const {labs} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(3);

    const handleClick = () => {
        labs.addResult(parseInt(location.pathname.split('/').pop()), result)
        navigation(`${ROUTE__VECTOR_LABS}/${parseInt(location.pathname.split('/').pop()) + 1}`)
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>{description}</p>
            <Matrix matrix={[[1, 2], [2, 2]]}/>
            <Matrix matrix={data}>
                <p>{explanation}</p>

            </Matrix>
            <Button variant='primary' style={{alignSelf: "self-end"}}
                    onClick={handleClick}>Проверить</Button>
        </div>
    );
};

export default observer(Type2);