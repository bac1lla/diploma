import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import classNames from "classnames/bind";
import styles from "./styles.css"
import {isEqual} from "lodash/lang";
import {tasks} from './tasks'
import {randomInteger} from "../../../../helpers";

const cx = classNames.bind(styles)

const task = tasks[0]


const description = "Сформулируйте матрицу коалиционной игры первого уровня 1 игрока против остальных. Для этого:"
const descriptionTaskOne = "1. Введите число строк (число стратегий 1 игрока) и столбцов (число стратегий коалиции остальных игроков) матрицы"
const descriptionTaskTwo = "2. Заполните появившийся шаблон матрицы"
const Type1Matrix = ({next}) => {
    const {labs} = useContext(Context)
    const navigation = useNavigate();
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);
    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');
    const [p1Error, setP1Error] = useState(false);
    const [p2Error, setP2Error] = useState(false);

    // переменная прогреса считатай что -просто числа 0 1 2 3 4
    const [progress, setProgress] = useState(0)

    const handleSetP1 = useCallback(e => {
        setP1(e.target.value);
    }, []);
    const handleSetP2 = useCallback(e => {
        setP2(e.target.value);
    }, []);

    const handleClick = useCallback(() => {
        labs.addResult(1, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/2`)
        next()
    }, [tries])

    const showAnswersPart1 = () => {
        setP1("2");
        setP2("8");
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            showAnswersPart1()
            setProgress(prev => prev + 1)
            document.getElementById("check1").hidden = true;
            document.getElementById("task_2").hidden = false;
        }
        let error = false

        if (!isEqual(p1, "2")
            // && !isEmpty(newP1)
        ) {
            setP1Error(true)
            error = true
        } else {
            setP1Error(false)
        }
        if (!isEqual(p2, "8")
            // && !isEmpty(newP2)
        ) {
            setP2Error(true)
            error = true
        } else {
            setP2Error(false)
        }

        if (!error) {
            showAnswersPart1();
            setProgress(prev => prev + 1)
            document.getElementById("task1part1input1").readOnly = true;
            document.getElementById("task1part1input2").readOnly = true;
            document.getElementById("check1").hidden = true;
            document.getElementById("task_2").hidden = false;
            return;
        }

        setTries(prev => prev - 1)
    }

    const [m11, setM11] = useState('');
    const [m12, setM12] = useState('');
    const [m13, setM13] = useState('');
    const [m14, setM14] = useState('');
    const [m15, setM15] = useState('');
    const [m16, setM16] = useState('');
    const [m17, setM17] = useState('');
    const [m18, setM18] = useState('');

    const [m21, setM21] = useState('');
    const [m22, setM22] = useState('');
    const [m23, setM23] = useState('');
    const [m24, setM24] = useState('');
    const [m25, setM25] = useState('');
    const [m26, setM26] = useState('');
    const [m27, setM27] = useState('');
    const [m28, setM28] = useState('');


    const [m11Error, setM11Error] = useState(false);
    const [m12Error, setM12Error] = useState(false);
    const [m13Error, setM13Error] = useState(false);
    const [m14Error, setM14Error] = useState(false);
    const [m15Error, setM15Error] = useState(false);
    const [m16Error, setM16Error] = useState(false);
    const [m17Error, setM17Error] = useState(false);
    const [m18Error, setM18Error] = useState(false);

    const [m21Error, setM21Error] = useState(false);
    const [m22Error, setM22Error] = useState(false);
    const [m23Error, setM23Error] = useState(false);
    const [m24Error, setM24Error] = useState(false);
    const [m25Error, setM25Error] = useState(false);
    const [m26Error, setM26Error] = useState(false);
    const [m27Error, setM27Error] = useState(false);
    const [m28Error, setM28Error] = useState(false);

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
    const handleSetM15 = useCallback(e => {
        setM15(e.target.value);
    }, []);
    const handleSetM16 = useCallback(e => {
        setM16(e.target.value);
    }, []);
    const handleSetM17 = useCallback(e => {
        setM17(e.target.value);
    }, []);
    const handleSetM18 = useCallback(e => {
        setM18(e.target.value);
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
    const handleSetM25 = useCallback(e => {
        setM25(e.target.value);
    }, []);
    const handleSetM26 = useCallback(e => {
        setM26(e.target.value);
    }, []);
    const handleSetM27 = useCallback(e => {
        setM27(e.target.value);
    }, []);
    const handleSetM28 = useCallback(e => {
        setM28(e.target.value);
    }, []);

    const showAnswers = () => {
        setM11(task?.answers[0]);
        setM12(task?.answers[1]);
        setM13(task?.answers[2]);
        setM14(task?.answers[3]);
        setM15(task?.answers[4]);
        setM16(task?.answers[5]);
        setM17(task?.answers[6]);
        setM18(task?.answers[7]);
        setM21(task?.answers[8]);
        setM22(task?.answers[9]);
        setM23(task?.answers[10]);
        setM24(task?.answers[11]);
        setM25(task?.answers[12]);
        setM26(task?.answers[13]);
        setM27(task?.answers[14]);
        setM28(task?.answers[15]);
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswers()
            // прибавляем прогресс
            setProgress(prev => prev + 1);
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
        if (!isEqual(m15, task?.answers[4])
            // && !isEmpty(newP5)
        ) {
            setM15Error(true)
            error = true
        } else {
            setM15Error(false)
        }
        if (!isEqual(m16, task?.answers[5])
            // && !isEmpty(newP6)
        ) {
            setM16Error(true)
            error = true
        } else {
            setM16Error(false)
        }
        if (!isEqual(m17, task?.answers[6])
            // && !isEmpty(newP7)
        ) {
            setM17Error(true)
            error = true
        } else {
            setM17Error(false)
        }
        if (!isEqual(m18, task?.answers[7])
            // && !isEmpty(newP8)
        ) {
            setM18Error(true)
            error = true
        } else {
            setM18Error(false)
        }
        if (!isEqual(m21, task?.answers[8])
            // && !isEmpty(newS1)
        ) {
            setM21Error(true)
            error = true
        } else {
            setM21Error(false)
        }
        if (!isEqual(m22, task?.answers[9])
            // && !isEmpty(newS2)
        ) {
            setM22Error(true)
            error = true
        } else {
            setM22Error(false)
        }
        if (!isEqual(m23, task?.answers[10])
            // && !isEmpty(newS3)
        ) {
            setM23Error(true)
            error = true
        } else {
            setM23Error(false)
        }
        if (!isEqual(m24, task?.answers[11])
            // && !isEmpty(newS4)
        ) {
            setM24Error(true)
            error = true
        } else {
            setM24Error(false)
        }
        if (!isEqual(m25, task?.answers[12])
            // && !isEmpty(newS5)
        ) {
            setM25Error(true)
            error = true
        } else {
            setM25Error(false)
        }
        if (!isEqual(m26, task?.answers[13])
            // && !isEmpty(newS6)
        ) {
            setM26Error(true)
            error = true
        } else {
            setM26Error(false)
        }
        if (!isEqual(m27, task?.answers[14])
            // && !isEmpty(newS7)
        ) {
            setM27Error(true)
            error = true
        } else {
            setM27Error(false)
        }
        if (!isEqual(m28, task?.answers[15])
            // && !isEmpty(newS8)
        ) {
            setM28Error(true)
            error = true
        } else {
            setM28Error(false)
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
        ['1', <input className={cx('input11', {error: m11Error})} value={m11} onChange={handleSetM11}
                     style={{width: 50}}/>,
            <input className={cx('input12', {error: m12Error})} value={m12} onChange={handleSetM12}
                   style={{width: 50}}/>,
            <input className={cx('input13', {error: m13Error})} value={m13} onChange={handleSetM13}
                   style={{width: 50}}/>,
            <input className={cx('input14', {error: m14Error})} value={m14} onChange={handleSetM14}
                   style={{width: 50}}/>,
            <input className={cx('input15', {error: m15Error})} value={m15} onChange={handleSetM15}
                   style={{width: 50}}/>,
            <input className={cx('input16', {error: m16Error})} value={m16} onChange={handleSetM16}
                   style={{width: 50}}/>,
            <input className={cx('input17', {error: m17Error})} value={m17} onChange={handleSetM17}
                   style={{width: 50}}/>,
            <input className={cx('input18', {error: m18Error})} value={m18} onChange={handleSetM18}
                   style={{width: 50}}/>],
        ['2', <input className={cx('input21', {error: m21Error})} value={m21} onChange={handleSetM21}
                     style={{width: 50}}/>,
            <input className={cx('input22', {error: m22Error})} value={m22} onChange={handleSetM22}
                   style={{width: 50}}/>,
            <input className={cx('input23', {error: m23Error})} value={m23} onChange={handleSetM23}
                   style={{width: 50}}/>,
            <input className={cx('input24', {error: m24Error})} value={m24} onChange={handleSetM24}
                   style={{width: 50}}/>,
            <input className={cx('input25', {error: m25Error})} value={m25} onChange={handleSetM25}
                   style={{width: 50}}/>,
            <input className={cx('input26', {error: m26Error})} value={m26} onChange={handleSetM26}
                   style={{width: 50}}/>,
            <input className={cx('input27', {error: m27Error})} value={m27} onChange={handleSetM27}
                   style={{width: 50}}/>,
            <input className={cx('input28', {error: m28Error})} value={m28} onChange={handleSetM28}
                   style={{width: 50}}/>]
    ]

    return (
        <div style={{
            width: '75%',
            height: '100%',
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 1</p>

            // FIXME: изменять цвет текста при переходе к некст пункту

            <p>{description}</p>
            <p
                className={cx({grayText: progress > 0})}
            >{descriptionTaskOne}</p>
            <p color="grey" className={cx({grayText: progress >= 2})}>{descriptionTaskTwo}</p>
            <label>число строк</label>
            <input type="text" id={'task1part1input1'} className={cx('task1part1input1', {error: p1Error})} value={p1}
                   onChange={handleSetP1}/>
            <label>число столбцов</label>
            <input type="text" id={'task1part1input2'} className={cx('task1part1input2', {error: p2Error})} value={p2}
                   onChange={handleSetP2}/>

            <Button id={'check1'} variant='primary' style={{alignSelf: "self-end"}}
                    onClick={checkTaskOne}>Проверить</Button>

            <div id="task_2" hidden={true}>
                <p>Стратегии коалиции 2, 3 и 4 игроков</p>
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

export default observer(Type1Matrix);