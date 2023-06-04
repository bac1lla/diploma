import {observer} from "mobx-react-lite";
import React, {useCallback, useContext} from 'react';
import {useNavigate} from "react-router";
import Select from "react-select";
import {ROUTE__MATRIX_LAB, ROUTE__MATRIX_TEST, ROUTE__VECTOR_LAB} from "../../../constants/routes";
import {Context} from "../../../index";
import './styles.css'

const options = [
    {
        value: {
            labName: 'Матричные игры',
            path: ROUTE__MATRIX_LAB,
        },
        label: 'Матричные игры'
    },
    {
        value: {
            labName: 'Задачи векторной оптимизации',
            path: ROUTE__VECTOR_LAB,
        },
        label: 'Задачи векторной оптимизации'
    },
]

const SelectLab = ({setStep}) => {
    const {labs} = useContext(Context);
    const navigate = useNavigate()

    const handleSelectMatrix = useCallback(() => {
        localStorage.removeItem('finishedSteps')
        setStep(0)
        navigate(ROUTE__MATRIX_LAB + "/0")
        window.location.reload();
        labs.setLab('Матричные игры')
    }, [labs, setStep])

    const handleSelectVector = useCallback(() => {
        localStorage.removeItem('finishedSteps')
        setStep(0)
        navigate(ROUTE__VECTOR_LAB + "/0")
        window.location.reload();
        labs.setLab('Задачи векторной оптимизации')
    }, [labs, setStep])

    const handleSelectMinValueMatrix = useCallback(() => {
        localStorage.removeItem('finishedSteps')
        navigate(ROUTE__MATRIX_TEST + "/1")
        labs.setLab('Нахождение цены игры платежной матрицы')
        setStep(0)
    }, [])

    return (
        <div className={'lab-select-wrapper'}>
            <div className={'lab-select-content'}>
                <h2 style={{textAlign: 'center', marginBottom: 30}}>Выберите лабораторную работу</h2>
                <div className={'lab-select-item'} onClick={handleSelectMatrix}>Матричные игры</div>
                <div className={'lab-select-item'} onClick={handleSelectVector}>Задачи векторной оптимизации</div>
                {/*<div className={'lab-select-item'} onClick={handleSelectMinValueMatrix}>Нахождение цены игры платежной*/}
                {/*    матрицы*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default observer(SelectLab);