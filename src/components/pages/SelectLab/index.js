import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {useNavigate} from "react-router";
import Select from "react-select";
import {ROUTE__MATRIX_LAB, ROUTE__VECTOR_LAB} from "../../../constants/routes";
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

const SelectLab = () => {
    const {labs} = useContext(Context)
    const navigate = useNavigate()

    const handleSelect = (option) => {
        labs.setLab(option.label)
        navigate(option.value.path)
    }

    return (
        <div className={'lab-select-wrapper'}>
            <Select className={'lab-select'} options={options} onChange={handleSelect}/>
        </div>
    );
};

export default observer(SelectLab);