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
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

const cx = classNames.bind(styles)


const description = "Сформулируйте матрицу коалиционной игры второго уровня 1 и 2 игроков против остальных. Для этого:"
const descriptionTaskOne = "1. Введите число строк (число стратегий коалиции 1 и 2 игроков) и столбцов (число стратегий коалиции остальных игроков) матрицы"
const descriptionTaskTwo = "2. Заполните появившийся шаблон матрицы"
const Type2Matrix = ({next, task}) => {
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
        const nextStep = next()
        navigation(`${ROUTE__MATRIX_LABS}/${nextStep}`)
    }, [tries, labs, next])

    const showAnswersPart1 = () => {
        setP1("4");
        setP2("4");
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            showAnswersPart1()
            setP1Error(false)
            setP2Error(false)
            setProgress(prev => prev + 1)
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
            return;
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
        setM11(task[0][0] + task[0][1]);
        setM12(task[1][0] + task[1][1]);
        setM13(task[2][0] + task[2][1]);
        setM14(task[3][0] + task[3][1]);
        setM21(task[4][0] + task[4][1]);
        setM22(task[5][0] + task[5][1]);
        setM23(task[6][0] + task[6][1]);
        setM24(task[7][0] + task[7][1]);
        setM31(task[8][0] + task[8][1]);
        setM32(task[9][0] + task[9][1]);
        setM33(task[10][0] + task[10][1]);
        setM34(task[11][0] + task[11][1]);
        setM41(task[12][0] + task[12][1]);
        setM42(task[13][0] + task[13][1]);
        setM43(task[14][0] + task[14][1]);
        setM44(task[15][0] + task[15][1]);
        setM11Error(false)
        setM12Error(false)
        setM13Error(false)
        setM14Error(false)
        setM31Error(false)
        setM32Error(false)
        setM33Error(false)
        setM34Error(false)
        setM21Error(false)
        setM22Error(false)
        setM23Error(false)
        setM24Error(false)
        setM41Error(false)
        setM42Error(false)
        setM43Error(false)
        setM44Error(false)
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswers()
            setProgress(prev => prev + 1)
            return;
        }
        let error = false

        if (!isEqual(m11, (task[0][0] + task[0][1]).toString())
            // && !isEmpty(newP1)
        ) {
            setM11Error(true)
            error = true
        } else {
            setM11Error(false)
        }
        if (!isEqual(m12, (task[1][0] + task[1][1]).toString())
            // && !isEmpty(newP2)
        ) {
            setM12Error(true)
            error = true
        } else {
            setM12Error(false)
        }
        if (!isEqual(m13, (task[2][0] + task[2][1]).toString())
            // && !isEmpty(newP3)
        ) {
            setM13Error(true)
            error = true
        } else {
            setM13Error(false)
        }
        if (!isEqual(m14, (task[3][0] + task[3][1]).toString())
            // && !isEmpty(newP4)
        ) {
            setM14Error(true)
            error = true
        } else {
            setM14Error(false)
        }
        if (!isEqual(m21, (task[4][0] + task[4][1]).toString())
            // && !isEmpty(newP5)
        ) {
            setM21Error(true)
            error = true
        } else {
            setM21Error(false)
        }
        if (!isEqual(m22, (task[5][0] + task[5][1]).toString())
            // && !isEmpty(newP6)
        ) {
            setM22Error(true)
            error = true
        } else {
            setM22Error(false)
        }
        if (!isEqual(m23, (task[6][0] + task[6][1]).toString())
            // && !isEmpty(newP7)
        ) {
            setM23Error(true)
            error = true
        } else {
            setM23Error(false)
        }
        if (!isEqual(m24, (task[7][0] + task[7][1]).toString())
            // && !isEmpty(newP8)
        ) {
            setM24Error(true)
            error = true
        } else {
            setM24Error(false)
        }
        if (!isEqual(m31, (task[8][0] + task[8][1]).toString())
            // && !isEmpty(newS1)
        ) {
            setM31Error(true)
            error = true
        } else {
            setM31Error(false)
        }
        if (!isEqual(m32, (task[9][0] + task[9][1]).toString())
            // && !isEmpty(newS2)
        ) {
            setM32Error(true)
            error = true
        } else {
            setM32Error(false)
        }
        if (!isEqual(m33, (task[10][0] + task[10][1]).toString())
            // && !isEmpty(newS3)
        ) {
            setM33Error(true)
            error = true
        } else {
            setM33Error(false)
        }
        if (!isEqual(m34, (task[11][0] + task[11][1]).toString())
            // && !isEmpty(newS4)
        ) {
            setM34Error(true)
            error = true
        } else {
            setM34Error(false)
        }
        if (!isEqual(m41, (task[12][0] + task[12][1]).toString())
            // && !isEmpty(newS5)
        ) {
            setM41Error(true)
            error = true
        } else {
            setM41Error(false)
        }
        if (!isEqual(m42, (task[13][0] + task[13][1]).toString())
            // && !isEmpty(newS6)
        ) {
            setM42Error(true)
            error = true
        } else {
            setM42Error(false)
        }
        if (!isEqual(m43, (task[14][0] + task[14][1]).toString())
            // && !isEmpty(newS7)
        ) {
            setM43Error(true)
            error = true
        } else {
            setM43Error(false)
        }
        if (!isEqual(m44, (task[15][0] + task[15][1]).toString())
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
        [
            <input className={cx('input11', {error: m11Error})} value={m11} onChange={handleSetM11}
                   style={{width: 50}}/>,
            <input className={cx('input12', {error: m12Error})} value={m12} onChange={handleSetM12}
                   style={{width: 50}}/>,
            <input className={cx('input21', {error: m13Error})} value={m13} onChange={handleSetM13}
                   style={{width: 50}}/>,
            <input className={cx('input22', {error: m14Error})} value={m14} onChange={handleSetM14}
                   style={{width: 50}}/>],
        [
            <input className={cx('input31', {error: m21Error})} value={m21} onChange={handleSetM21}
                   style={{width: 50}}/>,
            <input className={cx('input32', {error: m22Error})} value={m22} onChange={handleSetM22}
                   style={{width: 50}}/>,
            <input className={cx('input33', {error: m23Error})} value={m23} onChange={handleSetM23}
                   style={{width: 50}}/>,
            <input className={cx('input34', {error: m24Error})} value={m24} onChange={handleSetM24}
                   style={{width: 50}}/>],
        [
            <input className={cx('input31', {error: m31Error})} value={m31} onChange={handleSetM31}
                   style={{width: 50}}/>,
            <input className={cx('input32', {error: m32Error})} value={m32} onChange={handleSetM32}
                   style={{width: 50}}/>,
            <input className={cx('input33', {error: m33Error})} value={m33} onChange={handleSetM33}
                   style={{width: 50}}/>,
            <input className={cx('input34', {error: m34Error})} value={m34} onChange={handleSetM34}
                   style={{width: 50}}/>],
        [
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
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between',
            padding: '0 5% 1% 5%',
            overflow: 'auto',
            margin: 'auto',
        }}>
            <div>
                <div className={'task-text-description-vector'}>{description}</div>
                <div className={cx('task-text-description-vector', {grayText: progress > 0})}>{descriptionTaskOne}</div>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Matrix style={{display: 'flex', flexDirection: 'row', gap: 10}} size={'small'}
                            className={cx('matrix-1-table')}
                            ariaLabel={"a dense table"}
                            matrix={[[<span>число строк</span>, <input type="text" id={'task1part1input1'}
                                                                       className={cx('input-value-vector-3', {error: p1Error})}
                                                                       value={p1}
                                                                       onChange={handleSetP1}/>],
                                [<span>число столбцов</span>, <input type="text" id={'task1part1input2'}
                                                                     className={cx('input-value-vector-3', {error: p2Error})}
                                                                     value={p2}
                                                                     onChange={handleSetP2}/>]]}
                            postfix={<Button id={'check1'}
                                             style={{alignSelf: "center", margin: 'auto', display: 'block'}}
                                             variant='primary'
                                             onClick={checkTaskOne}>Проверить</Button>}
                    />
                </div>


                <div id={'task2'} hidden={true}>
                    <p className={cx('task-text-description-vector', {grayText: progress >= 2 || progress === 0})}>{descriptionTaskTwo}</p>
                    <p style={{margin: 0, padding: 0}} className={'task-text-description-vector'}>Стратегии коалиции 3 и
                        4 игроков</p>
                    <Matrix matrix={data}
                            size={'small'} ariaLabel={"a dense table"}
                            style={{width: "100%"}}
                            head={
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={'center'} className={'table-head-cell'}/>
                                        <TableCell align={'center'} className={'table-head-cell'}>
                                            1<br/>
                                            1<br/>
                                        </TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>
                                            1<br/>
                                            2
                                        </TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>
                                            2<br/>
                                            1
                                        </TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>
                                            2<br/>
                                            2
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            }
                            firstColumn={[
                                <TableCell align={'center'} className={'table-head-cell'}>1 1</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>1 2</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>2 1</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>2 2</TableCell>
                            ]}
                    />
                    <div
                        style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
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
        </div>
    );
};

export default observer(Type2Matrix);