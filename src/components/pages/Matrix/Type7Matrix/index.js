import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import {isEqual} from "lodash/lang";
import {tasks} from './tasks'
import classNames from "classnames/bind";
import styles from "../Type3Matrix/styles.css";

const cx = classNames.bind(styles)

const task = tasks[0]


const description = "Найдите верхнюю, нижнюю цены игры и гарантированный выигрыш для коалиционной игры первого уровня 1 игрока \n против остальных и укажите, существует ли решение в чистых стратегиях, или нет. \n        Для этого:"
const descriptionTaskOne = "1. Заполните столбец α (столбец минимумов строк: α = min α ) и строку β  (строка максимумов столбцов: β = max α ),\nпосле чего найдите максимальное из чисел α : α = max α и минимальное из чисел β : β = β ."
const descriptionTaskTwo = "2. Введите значения нижней, верхней цены игры и гарантированного выигрыша в соответствующие поля и укажите, \nсуществует ли решение игры в чистых стратегиях. "
const descriptionMatrix = "Стратегии коалиции 2, 3 и 4 игроков"
const Type7Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const navigation = useNavigate();
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);

    const handleClick = useCallback(() => {
        labs.addResult(7, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/8`)
        next()
    }, [tries])

    const [beta1, setBeta1] = useState('');
    const [beta2, setBeta2] = useState('');
    const [beta, setBeta] = useState('');
    const [alpha1, setAlpha1] = useState('');
    const [alpha2, setAlpha2] = useState('');
    const [alpha3, setAlpha3] = useState('');
    const [alpha4, setAlpha4] = useState('');
    const [alpha5, setAlpha5] = useState('');
    const [alpha6, setAlpha6] = useState('');
    const [alpha7, setAlpha7] = useState('');
    const [alpha8, setAlpha8] = useState('');
    const [alpha, setAlpha] = useState('');

    const [beta1Error, setBeta1Error] = useState(false);
    const [beta2Error, setBeta2Error] = useState(false);
    const [betaError, setBetaError] = useState(false);
    const [alpha1Error, setAlpha1Error] = useState(false);
    const [alpha2Error, setAlpha2Error] = useState(false);
    const [alpha3Error, setAlpha3Error] = useState(false);
    const [alpha4Error, setAlpha4Error] = useState(false);
    const [alpha5Error, setAlpha5Error] = useState(false);
    const [alpha6Error, setAlpha6Error] = useState(false);
    const [alpha7Error, setAlpha7Error] = useState(false);
    const [alpha8Error, setAlpha8Error] = useState(false);
    const [alphaError, setAlphaError] = useState(false);

    const handleSetBeta1 = useCallback(e => {
        setBeta1(e.target.value);
    }, []);
    const handleSetBeta2 = useCallback(e => {
        setBeta2(e.target.value);
    }, []);
    const handleSetBeta = useCallback(e => {
        setBeta(e.target.value);
    }, []);
    const handleSetAlpha1 = useCallback(e => {
        setAlpha1(e.target.value);
    }, []);
    const handleSetAlpha2 = useCallback(e => {
        setAlpha2(e.target.value);
    }, []);
    const handleSetAlpha3 = useCallback(e => {
        setAlpha3(e.target.value);
    }, []);
    const handleSetAlpha4 = useCallback(e => {
        setAlpha4(e.target.value);
    }, []);
    const handleSetAlpha5 = useCallback(e => {
        setAlpha5(e.target.value);
    }, []);
    const handleSetAlpha6 = useCallback(e => {
        setAlpha6(e.target.value);
    }, []);
    const handleSetAlpha7 = useCallback(e => {
        setAlpha7(e.target.value);
    }, []);
    const handleSetAlpha8 = useCallback(e => {
        setAlpha8(e.target.value);
    }, []);
    const handleSetAlpha = useCallback(e => {
        setAlpha(e.target.value);
    }, []);

    const showAnswersPart1 = () => {
        setBeta1(task?.answers[1]);
        setBeta2(task?.answers[2]);
        setBeta(task?.answers[3]);
        setAlpha1(task?.answers[4]);
        setAlpha2(task?.answers[5]);
        setAlpha3(task?.answers[6]);
        setAlpha4(task?.answers[7]);
        setAlpha5(task?.answers[8]);
        setAlpha6(task?.answers[9]);
        setAlpha7(task?.answers[10]);
        setAlpha8(task?.answers[11]);
        setAlpha(task?.answers[12]);
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
            showAnswersPart1()
        }
        let error = false

        if (!isEqual(beta1, task?.answers[1])
            // && !isEmpty(newS2)
        ) {
            setBeta1Error(true)
            error = true
        } else {
            setBeta1Error(false)
        }
        if (!isEqual(beta2, task?.answers[2])
            // && !isEmpty(newS3)
        ) {
            setBeta2Error(true)
            error = true
        } else {
            setBeta2Error(false)
        }
        if (!isEqual(beta, task?.answers[3])
            // && !isEmpty(newS4)
        ) {
            setBetaError(true)
            error = true
        } else {
            setBetaError(false)
        }
        if (!isEqual(alpha1, task?.answers[4])
            // && !isEmpty(newP1)
        ) {
            setAlpha1Error(true)
            error = true
        } else {
            setAlpha1Error(false)
        }
        if (!isEqual(alpha2, task?.answers[5])
            // && !isEmpty(newP2)
        ) {
            setAlpha2Error(true)
            error = true
        } else {
            setAlpha2Error(false)
        }
        if (!isEqual(alpha3, task?.answers[6])
            // && !isEmpty(newP3)
        ) {
            setAlpha3Error(true)
            error = true
        } else {
            setAlpha3Error(false)
        }
        if (!isEqual(alpha4, task?.answers[7])
            // && !isEmpty(newP4)
        ) {
            setAlpha4Error(true)
            error = true
        } else {
            setAlpha4Error(false)
        }
        if (!isEqual(alpha5, task?.answers[8])
            // && !isEmpty(newP5)
        ) {
            setAlpha5Error(true)
            error = true
        } else {
            setAlpha5Error(false)
        }
        if (!isEqual(alpha6, task?.answers[9])
            // && !isEmpty(newP6)
        ) {
            setAlpha6Error(true)
            error = true
        } else {
            setAlpha6Error(false)
        }
        if (!isEqual(alpha7, task?.answers[10])
            // && !isEmpty(newP7)
        ) {
            setAlpha7Error(true)
            error = true
        } else {
            setAlpha7Error(false)
        }
        if (!isEqual(alpha8, task?.answers[11])
            // && !isEmpty(newP8)
        ) {
            setAlpha8Error(true)
            error = true
        } else {
            setAlpha8Error(false)
        }
        if (!isEqual(alpha, task?.answers[12])
            // && !isEmpty(newS1)
        ) {
            setAlphaError(true)
            error = true
        } else {
            setAlphaError(false)
        }

        if (!error) {
            showAnswersPart1()
            for (let i = 1; i < 9; i++) {
                document.getElementById("alpha" + i).readOnly = true;
            }
            document.getElementById("alpha").readOnly = true;
            document.getElementById("beta1").readOnly = true;
            document.getElementById("beta2").readOnly = true;
            document.getElementById("beta").readOnly = true;
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
            return;
        }

        setTries(prev => prev - 1)

    }

    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    const [v4, setV4] = useState('');

    const [v1Error, setV1Error] = useState(false);
    const [v2Error, setV2Error] = useState(false);
    const [v3Error, setV3Error] = useState(false);
    const [v4Error, setV4Error] = useState(false);


    const handleSetV1 = useCallback(e => {
        setV1(e.target.value);
    }, []);
    const handleSetV2 = useCallback(e => {
        setV2(e.target.value);
    }, []);
    const handleSetV3 = useCallback(e => {
        setV3(e.target.value);
    }, []);
    const handleSetV4 = useCallback(e => {
        setV4(e.target.value);
    }, []);

    const showAnswersPart2 = () => {
        setV1(task?.answers[12]);
        setV2(task?.answers[13]);
        setV3(task?.answers[14]);
        setV4(task?.answers[15]);
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswersPart2()
        }
        let error = false

        if (!isEqual(v1, task?.answers[12])
            // && !isEmpty(newP1)
        ) {
            setV1Error(true)
            error = true
        } else {
            setV1Error(false)
        }
        if (!isEqual(v2, task?.answers[13])
            // && !isEmpty(newP2)
        ) {
            setV2Error(true)
            error = true
        } else {
            setV2Error(false)
        }
        if (!isEqual(v3, task?.answers[14])
            // && !isEmpty(newP3)
        ) {
            setV3Error(true)
            error = true
        } else {
            setV3Error(false)
        }
        // if (!isEqual(v4, task?.answers[15])
        //     // && !isEmpty(newP4)
        // ) {
        //     setV4Error(true)
        //     error = true
        // } else {
        //     setV4Error(false)
        // }
        //
        if (!error) {
            setSuccess(true);
            return;
        }

        setTries(prev => prev - 1)
    }

    const data = [
        ['', <>
            <div>β1</div>
        </>, <>
            <div>β2</div>
        </>,],
        ['α1', 'value', 'value',
            <input id={'alpha1'} className={cx('alpha1', {error: alpha1Error})} value={alpha1}
                   onChange={handleSetAlpha1} style={{width: 50}}/>],
        ['α2', 'value', 'value',
            <input id={'alpha2'} className={cx('alpha2', {error: alpha2Error})} value={alpha2}
                   onChange={handleSetAlpha2} style={{width: 50}}/>],
        ['α3', 'value', 'value',
            <input id={'alpha3'} className={cx('alpha3', {error: alpha3Error})} value={alpha3}
                   onChange={handleSetAlpha3} style={{width: 50}}/>],
        ['α4', 'value', 'value',
            <input id={'alpha4'} className={cx('alpha4', {error: alpha4Error})} value={alpha4}
                   onChange={handleSetAlpha4} style={{width: 50}}/>, 'β'],
        ['α5', 'value', 'value',
            <input id={'alpha5'} className={cx('alpha5', {error: alpha5Error})} value={alpha5}
                   onChange={handleSetAlpha5} style={{width: 50}}/>,
            <input id={'alpha'} className={cx('alpha', {error: alpha1Error})} value={alpha} onChange={handleSetAlpha}
                   style={{width: 50}}/>],
        ['α6', 'value', 'value',
            <input id={'alpha6'} className={cx('alpha6', {error: alpha6Error})} value={alpha6}
                   onChange={handleSetAlpha6} style={{width: 50}}/>],
        ['α7', 'value', 'value',
            <input id={'alpha7'} className={cx('alpha7', {error: alpha7Error})} value={alpha7}
                   onChange={handleSetAlpha7} style={{width: 50}}/>],
        ['α8', 'value', 'value',
            <input id={'alpha8'} className={cx('alpha8', {error: alpha8Error})} value={alpha8}
                   onChange={handleSetAlpha8} style={{width: 50}}/>],
        ['',
            <input id={'beta1'} className={cx('beta1', {error: beta1Error})} value={beta1} onChange={handleSetBeta1}
                   style={{width: 50}}/>,
            <input id={'beta2'} className={cx('beta2', {error: beta2Error})} value={beta2} onChange={handleSetBeta2}
                   style={{width: 50}}/>],
        ['', 'α',
            <input id={'beta'} className={cx('beta', {error: betaError})} value={beta} onChange={handleSetBeta}
                   style={{width: 50}}/>, '']
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
            <p>Задание 7</p>

            // FIXME: изменять цвет текста при переходе к некст пункту

            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p color="grey">{descriptionTaskTwo}</p>

            <div style={{display: "flex", alignItems: "center", marginLeft: "200px"}}>
                <div style={{display: "flex", alignItems: "center", width: "40%"}}>
                    <Matrix matrix={data}>
                        <p>{descriptionMatrix}</p>
                    </Matrix>

                    {
                        !success &&
                        <Button id={'check1'} variant='primary' style={{alignSelf: "center", marginLeft: 20}}
                                onClick={checkTaskOne}>
                            {tries > 0 ? "Проверить" : "Показать ответы"}
                        </Button>
                    }
                </div>
                <div id={'task2'} hidden={true} style={{marginLeft: "60px", marginTop: "45px"}}>
                    <Matrix matrix={[
                        [<label htmlFor="task2part1">Нижняя цена игры</label>,
                            <input id={'v1'} className={cx('v1', {error: v1Error})} value={v1} onChange={handleSetV1}
                                   type="text" style={{width: 50}}/>],
                        [<label htmlFor="task2part2">Верхняя цена игры</label>,
                            <input id={'v2'} className={cx('v2', {error: v2Error})} value={v2} onChange={handleSetV2}
                                   type="text" style={{width: 50}}/>],
                        [<label htmlFor="task2part2">Гарантированный выигрыш</label>,
                            <input id={'v3'} className={cx('v3', {error: v3Error})} value={v3} onChange={handleSetV3}
                                   type="text" style={{width: 50}}/>],
                        [<p>Решение в чистых стратегиях:</p>,
                            <div style={{display: "flex", gap: 5}}><input type="radio" name="task2part3"
                                                                          id={'task2part31'}/><label
                                htmlFor="task2part31">существует</label></div>],
                        ['', <div style={{display: "flex", gap: 5}}><input type="radio" name="task2part3"
                                                                           id={'task2part32'}/><label
                            htmlFor="task2part31">не существует</label></div>]
                    ]}/>

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
        </div>
    );
};

export default observer(Type7Matrix);