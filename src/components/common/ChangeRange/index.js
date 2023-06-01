import {observer} from "mobx-react-lite";
import React, {useContext, useMemo, useState} from 'react';
import Slider from '@mui/material/Slider';
import {Button} from "react-bootstrap";
import {useLocation} from "react-router";
import {ROUTE__PAYMENT_MATRIX_LAB__TEACHER, ROUTE__VECTOR_LAB__TEACHER} from "../../../constants/routes";
import {Context} from "../../../index";
import Matrix from "../Matrix";
import styles from './styles.css'
import Text from "../Text";
import classNames from "classnames/bind";
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChangeRange = ({onClose, onSave, range}) => {
    const {labs} = useContext(Context);
    const location = useLocation();
    const isVector = location.pathname.includes(ROUTE__VECTOR_LAB__TEACHER)
    const isPaymentMatrix = location.pathname.includes(ROUTE__PAYMENT_MATRIX_LAB__TEACHER);

    const minValue = range.minValue;
    const maxValue = range.maxValue;
    const [minRange5, setMinRange5] = useState(range.minRange5)
    const [minRange4, setMinRange4] = useState(range.minRange4)
    const [minRange3, setMinRange3] = useState(range.minRange3)

    const marks = [
        {
            value: minValue,
            label: minValue,
        },
        {
            value: maxValue,
            label: maxValue,
        },
    ];

    const handleChange = (event, newValue) => {
        if (Array.isArray(newValue)) {
            const [range3, range4, range5] = newValue;
            setMinRange3(range3);
            setMinRange4(range4);
            setMinRange5(range5)
        }
    };

    const handleSave = () => {
        onSave({
            minValue,
            minRange3,
            minRange4,
            minRange5,
            maxValue
        })
    }

    return (
        <div className={'change-range-wrapper'}>
            <Text className={'range-header'}
                  text={isVector ? 'Изменить критерий оценки лабораторной работы \n"Задачи векторной оптимизации"' : isPaymentMatrix ? 'Изменить критерий оценки теста "Платежные матрицы"' : 'Изменить критерий оценки лабораторной работы \n"Матричные игры"'}/>
            <div className={'change-range-column'}>
                <Matrix
                    style={{}}
                    size={'small'} ariaLabel={"a dense table"}
                    matrix={[
                        [<Text text={'5'} className={'change-range-number change-range-number-5'}/>,
                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text text={minRange5}
                                                                                                className={'change-range-field'}/>
                                <Text text={"-"} className={'change-range-sep'}/>
                                <Text text={maxValue} className={'change-range-field'}/></div>],
                        [
                            <Text text={'4'} className={'change-range-number change-range-number-4'}/>,
                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text text={minRange4}
                                                                                                className={'change-range-field'}/>
                                <Text text={"-"} className={'change-range-sep'}/>
                                <Text text={minRange5 - 1} className={'change-range-field'}/>
                            </div>],
                        [
                            <Text text={'3'} className={'change-range-number change-range-number-3'}/>,
                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text text={minRange3}
                                                                                                className={'change-range-field'}/>
                                <Text text={"-"} className={'change-range-sep'}/>
                                <Text text={minRange4 - 1} className={'change-range-field'}/>
                            </div>], [
                            <Text text={'2'} className={'change-range-number change-range-number-2'}/>,
                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text text={minValue}
                                                                                                className={'change-range-field'}/>
                                <Text text={"-"} className={'change-range-sep'}/>
                                <Text text={minRange3 - 1} className={'change-range-field'}/>
                            </div>]
                    ]}/>

                <Slider
                    min={minValue + 1}
                    max={maxValue}
                    step={1}
                    valueLabelDisplay="on"
                    marks={marks}
                    value={[minRange3, minRange4, minRange5]}
                    className={'change-range-input'}
                    onChange={handleChange}
                />
            </div>
            <div className={'change-range-row-btn'}>
                <Button className={'change-range-btn'} variant={'danger'} onClick={onClose}>
                    Отменить
                </Button>
                <Button className={'change-range-btn'} onClick={handleSave}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default observer(ChangeRange);