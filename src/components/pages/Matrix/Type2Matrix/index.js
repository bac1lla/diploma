import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import {isEqual} from "lodash/lang";
import classNames from "classnames/bind";
import styles from "./styles.css"
import {tasks} from './tasks'
import {randomInteger} from "../../../../helpers";

const cx = classNames.bind(styles)

const task = tasks[0]

const description = "Сформулируйте матрицу коалиционной игры второго уровня 1 и 2 игроков против остальных. Для этого:"
const descriptionTaskOne = "Введите число строк (число стратегий коалиции 1 и 2 игроков) и столбцов (число стратегий коалиции остальных игроков) матрицы"
const descriptionTaskTwo = "Заполните появившийся шаблон матрицы"
const Type2Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const navigation = useNavigate();
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);
    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');
    const [p1Error, setP1Error] = useState(false);
    const [p2Error, setP2Error] = useState(false);
    const [progress, setProgress] = useState(0)

    const handleSetP1 = useCallback(e => {
        setP1(e.target.value);
    }, []);
    const handleSetP2 = useCallback(e => {
        setP2(e.target.value);
    }, []);

    const handleClick = useCallback(() => {
        labs.addResult(2, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/3`)
        next()
    }, [tries])

    const showAnswersPart1 = () => {
        setP1("4");
        setP2("4");
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            showAnswersPart1()
            setProgress(prev => prev + 1)
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
        }
        let error = false

        if (!isEqual(p1, "4")
            // && !isEmpty(newP1)
        ) {
            setP1Error(true)
            error = true
        } else {
            setP1Error(false)
        }
        if (!isEqual(p2, "4")
            // && !isEmpty(newP2)
        ) {
            setP2Error(true)
            error = true
        } else {
            setP2Error(false)
        }

        if (!error) {
            showAnswersPart1()
            setProgress(prev => prev + 1)
            document.getElementById("task1part1input1").readOnly = true;
            document.getElementById("task1part1input2").readOnly = true;
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
            return;
        }

        setTries(prev => prev - 1)
    }

    const [m11, setM11] = useState('');
    const [m12, setM12] = useState('');
    const [m13, setM13] = useState('');
    const [m14, setM14] = useState('');
    const [m21, setM21] = useState('');
    const [m22, setM22] = useState('');
    const [m23, setM23] = useState('');
    const [m24, setM24] = useState('');

    const [m31, setM31] = useState('');
    const [m32, setM32] = useState('');
    const [m33, setM33] = useState('');
    const [m34, setM34] = useState('');
    const [m41, setM41] = useState('');
    const [m42, setM42] = useState('');
    const [m43, setM43] = useState('');
    const [m44, setM44] = useState('');


    const [m11Error, setM11Error] = useState(false);
    const [m12Error, setM12Error] = useState(false);
    const [m13Error, setM13Error] = useState(false);
    const [m14Error, setM14Error] = useState(false);
    const [m21Error, setM21Error] = useState(false);
    const [m22Error, setM22Error] = useState(false);
    const [m23Error, setM23Error] = useState(false);
    const [m24Error, setM24Error] = useState(false);

    const [m31Error, setM31Error] = useState(false);
    const [m32Error, setM32Error] = useState(false);
    const [m33Error, setM33Error] = useState(false);
    const [m34Error, setM34Error] = useState(false);
    const [m41Error, setM41Error] = useState(false);
    const [m42Error, setM42Error] = useState(false);
    const [m43Error, setM43Error] = useState(false);
    const [m44Error, setM44Error] = useState(false);

    const handleSetM11 = useCallback(e => {
        setM11(e.target.value);
    }, []);
    const handleSetM12 = useCallback(e => {
        setM12(e.target.value);
    }, []);
    const handleSetM13 = useCallback(e => {
        setM13(e.target.value);
    }, []);
    const handleSetM14 = useCallback(e => {
        setM14(e.target.value);
    }, []);
    const handleSetM21 = useCallback(e => {
        setM21(e.target.value);
    }, []);
    const handleSetM22 = useCallback(e => {
        setM22(e.target.value);
    }, []);
    const handleSetM23 = useCallback(e => {
        setM23(e.target.value);
    }, []);
    const handleSetM24 = useCallback(e => {
        setM24(e.target.value);
    }, []);

    const handleSetM31 = useCallback(e => {
        setM31(e.target.value);
    }, []);
    const handleSetM32 = useCallback(e => {
        setM32(e.target.value);
    }, []);
    const handleSetM33 = useCallback(e => {
        setM33(e.target.value);
    }, []);
    const handleSetM34 = useCallback(e => {
        setM34(e.target.value);
    }, []);
    const handleSetM41 = useCallback(e => {
        setM41(e.target.value);
    }, []);
    const handleSetM42 = useCallback(e => {
        setM42(e.target.value);
    }, []);
    const handleSetM43 = useCallback(e => {
        setM43(e.target.value);
    }, []);
    const handleSetM44 = useCallback(e => {
        setM44(e.target.value);
    }, []);

    const showAnswers = () => {
        setM11(task?.answers[0]);
        setM12(task?.answers[1]);
        setM13(task?.answers[2]);
        setM14(task?.answers[3]);
        setM21(task?.answers[4]);
        setM22(task?.answers[5]);
        setM23(task?.answers[6]);
        setM24(task?.answers[7]);
        setM31(task?.answers[8]);
        setM32(task?.answers[9]);
        setM33(task?.answers[10]);
        setM34(task?.answers[11]);
        setM41(task?.answers[12]);
        setM42(task?.answers[13]);
        setM43(task?.answers[14]);
        setM44(task?.answers[15]);
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setProgress(prev => prev + 1)
            setSuccess(true);
            showAnswers()
        }
        let error = false

        if (!isEqual(m11, task?.answers[0])
            // && !isEmpty(newP1)
        ) {
            setM11Error(true)
            error = true
        } else {
            setM11Error(false)
        }
        if (!isEqual(m12, task?.answers[1])
            // && !isEmpty(newP2)
        ) {
            setM12Error(true)
            error = true
        } else {
            setM12Error(false)
        }
        if (!isEqual(m13, task?.answers[2])
            // && !isEmpty(newP3)
        ) {
            setM13Error(true)
            error = true
        } else {
            setM13Error(false)
        }
        if (!isEqual(m14, task?.answers[3])
            // && !isEmpty(newP4)
        ) {
            setM14Error(true)
            error = true
        } else {
            setM14Error(false)
        }
        if (!isEqual(m21, task?.answers[4])
            // && !isEmpty(newP5)
        ) {
            setM21Error(true)
            error = true
        } else {
            setM21Error(false)
        }
        if (!isEqual(m22, task?.answers[5])
            // && !isEmpty(newP6)
        ) {
            setM22Error(true)
            error = true
        } else {
            setM22Error(false)
        }
        if (!isEqual(m23, task?.answers[6])
            // && !isEmpty(newP7)
        ) {
            setM23Error(true)
            error = true
        } else {
            setM23Error(false)
        }
        if (!isEqual(m24, task?.answers[7])
            // && !isEmpty(newP8)
        ) {
            setM24Error(true)
            error = true
        } else {
            setM24Error(false)
        }
        if (!isEqual(m31, task?.answers[8])
            // && !isEmpty(newS1)
        ) {
            setM31Error(true)
            error = true
        } else {
            setM31Error(false)
        }
        if (!isEqual(m32, task?.answers[9])
            // && !isEmpty(newS2)
        ) {
            setM32Error(true)
            error = true
        } else {
            setM32Error(false)
        }
        if (!isEqual(m33, task?.answers[10])
            // && !isEmpty(newS3)
        ) {
            setM33Error(true)
            error = true
        } else {
            setM33Error(false)
        }
        if (!isEqual(m34, task?.answers[11])
            // && !isEmpty(newS4)
        ) {
            setM34Error(true)
            error = true
        } else {
            setM34Error(false)
        }
        if (!isEqual(m41, task?.answers[12])
            // && !isEmpty(newS5)
        ) {
            setM41Error(true)
            error = true
        } else {
            setM41Error(false)
        }
        if (!isEqual(m42, task?.answers[13])
            // && !isEmpty(newS6)
        ) {
            setM42Error(true)
            error = true
        } else {
            setM42Error(false)
        }
        if (!isEqual(m43, task?.answers[14])
            // && !isEmpty(newS7)
        ) {
            setM43Error(true)
            error = true
        } else {
            setM43Error(false)
        }
        if (!isEqual(m44, task?.answers[15])
            // && !isEmpty(newS8)
        ) {
            setM44Error(true)
            error = true
        } else {
            setM44Error(false)
        }

        if (!error) {
            setProgress(prev => prev + 1)
            setSuccess(true);
            return;
        }

        setTries(prev => prev - 1)

    }

    const data = [
        ['', <>
            <div>1</div>
            <div>1</div>
        </>, <>
            <div>1</div>
            <div>2</div>
        </>, <>
            <div>2</div>
            <div>1</div>
        </>, <>
            <div>2</div>
            <div>2</div>
        </>,],
        ['1  1',
            <input className={cx('input11', {error: m11Error})} value={m11} onChange={handleSetM11}
                   style={{width: 50}}/>,
            <input className={cx('input12', {error: m12Error})} value={m12} onChange={handleSetM12}
                   style={{width: 50}}/>,
            <input className={cx('input21', {error: m13Error})} value={m13} onChange={handleSetM13}
                   style={{width: 50}}/>,
            <input className={cx('input22', {error: m14Error})} value={m14} onChange={handleSetM14}
                   style={{width: 50}}/>],
        ['1  2',
            <input className={cx('input31', {error: m21Error})} value={m21} onChange={handleSetM21}
                   style={{width: 50}}/>,
            <input className={cx('input32', {error: m22Error})} value={m22} onChange={handleSetM22}
                   style={{width: 50}}/>,
            <input className={cx('input33', {error: m23Error})} value={m23} onChange={handleSetM23}
                   style={{width: 50}}/>,
            <input className={cx('input34', {error: m24Error})} value={m24} onChange={handleSetM24}
                   style={{width: 50}}/>],
        ['2  1',
            <input className={cx('input31', {error: m31Error})} value={m31} onChange={handleSetM31}
                   style={{width: 50}}/>,
            <input className={cx('input32', {error: m32Error})} value={m32} onChange={handleSetM32}
                   style={{width: 50}}/>,
            <input className={cx('input33', {error: m33Error})} value={m33} onChange={handleSetM33}
                   style={{width: 50}}/>,
            <input className={cx('input34', {error: m34Error})} value={m34} onChange={handleSetM34}
                   style={{width: 50}}/>],
        ['2  2',
            <input className={cx('input41', {error: m41Error})} value={m41} onChange={handleSetM41}
                   style={{width: 50}}/>,
            <input className={cx('input42', {error: m42Error})} value={m42} onChange={handleSetM42}
                   style={{width: 50}}/>,
            <input className={cx('input43', {error: m43Error})} value={m43} onChange={handleSetM43}
                   style={{width: 50}}/>,
            <input className={cx('input44', {error: m44Error})} value={m44} onChange={handleSetM44}
                   style={{width: 50}}/>]
    ]

    return (
        <div style={{
            width: '100%',
            height: '100%',
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 2</p>

            // FIXME: изменять цвет текста при переходе к некст пункту

            <p>{description}</p>
            <p className={cx({grayText: progress > 0})}>{descriptionTaskOne}</p>
            <p color="grey" className={cx({grayText: progress >= 2})}>{descriptionTaskTwo}</p>

            <label>число строк</label>
            <input type="text" id={'task1part1input1'} className={cx('task1part1input1', {error: p1Error})} value={p1}
                   onChange={handleSetP1}/>
            <label>число столбцов</label>
            <input type="text" id={'task1part1input2'} className={cx('task1part1input2', {error: p2Error})} value={p2}
                   onChange={handleSetP2}/>

            <Button id={'check1'} variant='primary' style={{alignSelf: "self-end"}}
                    onClick={checkTaskOne}>Проверить</Button>

            <div id={'task2'} hidden={true}>
                <p>Стратегии коалиции 3 и 4 игроков</p>
                <Matrix matrix={data}>

                </Matrix>
                {
                    success &&
                    <Button variant='primary' style={{alignSelf: "self-end"}} onClick={handleClick}>
                        Далее
                    </Button>
                }
                {
                    !success &&
                    <Button variant='primary' style={{alignSelf: "self-end"}}
                            onClick={checkTaskTwo}>
                        {tries > 0 ? "Проверить" : "Показать ответы"}
                    </Button>
                }
            </div>
        </div>
    );
};

export default observer(Type2Matrix);