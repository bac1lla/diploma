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
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const cx = classNames.bind(styles)

const description = "Сформулируйте матрицу коалиционной игры второго уровня 1, 2 и 3 игроков против 4. Для этого:"
const descriptionTaskOne = "1. Введите число строк (число стратегий коалиции 1, 2 и 3 игроков) и столбцов (число стратегий 4 игрока) матрицы"
const descriptionTaskTwo = "2. Заполните появившийся шаблон матрицы"
const Type3Matrix = ({next, task}) => {
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
        labs.addResult(3, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/4`)
        next()
    }, [tries])

    const showAnswersPart1 = () => {
        setP1("8");
        setP2("2");
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            showAnswersPart1()
            setProgress(prev => prev + 1);
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
        }
        let error = false

        if (!isEqual(p1, "8")
            // && !isEmpty(newP1)
        ) {
            setP1Error(true)
            error = true
        } else {
            setP1Error(false)
        }
        if (!isEqual(p2, "2")
            // && !isEmpty(newP2)
        ) {
            setP2Error(true)
            error = true
        } else {
            setP2Error(false)
        }

        if (!error) {
            showAnswersPart1()
            setProgress(prev => prev + 1);
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
    const [m21, setM21] = useState('');
    const [m22, setM22] = useState('');
    const [m31, setM31] = useState('');
    const [m32, setM32] = useState('');
    const [m41, setM41] = useState('');
    const [m42, setM42] = useState('');
    const [m51, setM51] = useState('');
    const [m52, setM52] = useState('');
    const [m61, setM61] = useState('');
    const [m62, setM62] = useState('');
    const [m71, setM71] = useState('');
    const [m72, setM72] = useState('');
    const [m81, setM81] = useState('');
    const [m82, setM82] = useState('');


    const [m11Error, setM11Error] = useState(false);
    const [m12Error, setM12Error] = useState(false);
    const [m21Error, setM21Error] = useState(false);
    const [m22Error, setM22Error] = useState(false);
    const [m31Error, setM31Error] = useState(false);
    const [m32Error, setM32Error] = useState(false);
    const [m41Error, setM41Error] = useState(false);
    const [m42Error, setM42Error] = useState(false);
    const [m51Error, setM51Error] = useState(false);
    const [m52Error, setM52Error] = useState(false);
    const [m61Error, setM61Error] = useState(false);
    const [m62Error, setM62Error] = useState(false);
    const [m71Error, setM71Error] = useState(false);
    const [m72Error, setM72Error] = useState(false);
    const [m81Error, setM81Error] = useState(false);
    const [m82Error, setM82Error] = useState(false);

    const handleSetM11 = useCallback(e => {
        setM11(e.target.value);
    }, []);
    const handleSetM12 = useCallback(e => {
        setM12(e.target.value);
    }, []);
    const handleSetM21 = useCallback(e => {
        setM21(e.target.value);
    }, []);
    const handleSetM22 = useCallback(e => {
        setM22(e.target.value);
    }, []);
    const handleSetM31 = useCallback(e => {
        setM31(e.target.value);
    }, []);
    const handleSetM32 = useCallback(e => {
        setM32(e.target.value);
    }, []);
    const handleSetM41 = useCallback(e => {
        setM41(e.target.value);
    }, []);
    const handleSetM42 = useCallback(e => {
        setM42(e.target.value);
    }, []);
    const handleSetM51 = useCallback(e => {
        setM51(e.target.value);
    }, []);
    const handleSetM52 = useCallback(e => {
        setM52(e.target.value);
    }, []);
    const handleSetM61 = useCallback(e => {
        setM61(e.target.value);
    }, []);
    const handleSetM62 = useCallback(e => {
        setM62(e.target.value);
    }, []);
    const handleSetM71 = useCallback(e => {
        setM71(e.target.value);
    }, []);
    const handleSetM72 = useCallback(e => {
        setM72(e.target.value);
    }, []);
    const handleSetM81 = useCallback(e => {
        setM81(e.target.value);
    }, []);
    const handleSetM82 = useCallback(e => {
        setM82(e.target.value);
    }, []);

    const showAnswers = () => {
        setM11(task[0][0] + task[0][1] + task[0][2]);
        setM12(task[1][0] + task[1][1] + task[1][2]);
        setM21(task[2][0] + task[2][1] + task[2][2]);
        setM22(task[3][0] + task[3][1] + task[3][2]);
        setM31(task[4][0] + task[4][1] + task[4][2]);
        setM32(task[5][0] + task[5][1] + task[5][2]);
        setM41(task[6][0] + task[6][1] + task[6][2]);
        setM42(task[7][0] + task[7][1] + task[7][2]);
        setM51(task[8][0] + task[8][1] + task[8][2]);
        setM52(task[9][0] + task[9][1] + task[9][2]);
        setM61(task[10][0] + task[10][1] + task[10][2]);
        setM62(task[11][0] + task[11][1] + task[11][2]);
        setM71(task[12][0] + task[12][1] + task[12][2]);
        setM72(task[13][0] + task[13][1] + task[13][2]);
        setM81(task[14][0] + task[14][1] + task[14][2]);
        setM82(task[15][0] + task[15][1] + task[15][2]);
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setSuccess(true);
            setProgress(prev => prev + 1);
            showAnswers()
        }
        let error = false

        if (!isEqual(m11, (task[0][0] + task[0][1] + task[0][2]).toString())
            // && !isEmpty(newP1)
        ) {
            setM11Error(true)
            error = true
        } else {
            setM11Error(false)
        }
        if (!isEqual(m12, (task[1][0] + task[1][1] + task[1][2]).toString())
            // && !isEmpty(newP2)
        ) {
            setM12Error(true)
            error = true
        } else {
            setM12Error(false)
        }
        if (!isEqual(m21, (task[2][0] + task[2][1] + task[2][2]).toString())
            // && !isEmpty(newP3)
        ) {
            setM21Error(true)
            error = true
        } else {
            setM21Error(false)
        }
        if (!isEqual(m22, (task[3][0] + task[3][1] + task[3][2]).toString())
            // && !isEmpty(newP4)
        ) {
            setM22Error(true)
            error = true
        } else {
            setM22Error(false)
        }
        if (!isEqual(m31, (task[4][0] + task[4][1] + task[4][2]).toString())
            // && !isEmpty(newP5)
        ) {
            setM31Error(true)
            error = true
        } else {
            setM31Error(false)
        }
        if (!isEqual(m32, (task[5][0] + task[5][1] + task[5][2]).toString())
            // && !isEmpty(newP6)
        ) {
            setM32Error(true)
            error = true
        } else {
            setM32Error(false)
        }
        if (!isEqual(m41, (task[6][0] + task[6][1] + task[6][2]).toString())
            // && !isEmpty(newP7)
        ) {
            setM41Error(true)
            error = true
        } else {
            setM41Error(false)
        }
        if (!isEqual(m42, (task[7][0] + task[7][1] + task[7][2]).toString())
            // && !isEmpty(newP8)
        ) {
            setM42Error(true)
            error = true
        } else {
            setM42Error(false)
        }
        if (!isEqual(m51, (task[8][0] + task[8][1] + task[8][2]).toString())
            // && !isEmpty(newS1)
        ) {
            setM51Error(true)
            error = true
        } else {
            setM51Error(false)
        }
        if (!isEqual(m52, (task[9][0] + task[9][1] + task[9][2]).toString())
            // && !isEmpty(newS2)
        ) {
            setM52Error(true)
            error = true
        } else {
            setM52Error(false)
        }
        if (!isEqual(m61, (task[10][0] + task[10][1] + task[10][2]).toString())
            // && !isEmpty(newS3)
        ) {
            setM61Error(true)
            error = true
        } else {
            setM61Error(false)
        }
        if (!isEqual(m62, (task[11][0] + task[11][1] + task[11][2]).toString())
            // && !isEmpty(newS4)
        ) {
            setM62Error(true)
            error = true
        } else {
            setM62Error(false)
        }
        if (!isEqual(m71, (task[12][0] + task[12][1] + task[12][2]).toString())
            // && !isEmpty(newS5)
        ) {
            setM71Error(true)
            error = true
        } else {
            setM71Error(false)
        }
        if (!isEqual(m72, (task[13][0] + task[13][1] + task[13][2]).toString())
            // && !isEmpty(newS6)
        ) {
            setM72Error(true)
            error = true
        } else {
            setM72Error(false)
        }
        if (!isEqual(m81, (task[14][0] + task[14][1] + task[14][2]).toString())
            // && !isEmpty(newS7)
        ) {
            setM81Error(true)
            error = true
        } else {
            setM81Error(false)
        }
        if (!isEqual(m82, (task[15][0] + task[15][1] + task[15][2]).toString())
            // && !isEmpty(newS8)
        ) {
            setM82Error(true)
            error = true
        } else {
            setM82Error(false)
        }

        if (!error) {
            setProgress(prev => prev + 1);
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
                   style={{width: 50}}/>],
        [
            <input className={cx('input21', {error: m21Error})} value={m21} onChange={handleSetM21}
                   style={{width: 50}}/>,
            <input className={cx('input22', {error: m22Error})} value={m22} onChange={handleSetM22}
                   style={{width: 50}}/>],
        [
            <input className={cx('input31', {error: m31Error})} value={m31} onChange={handleSetM31}
                   style={{width: 50}}/>,
            <input className={cx('input32', {error: m32Error})} value={m32} onChange={handleSetM32}
                   style={{width: 50}}/>],
        [
            <input className={cx('input41', {error: m41Error})} value={m41} onChange={handleSetM41}
                   style={{width: 50}}/>,
            <input className={cx('input42', {error: m42Error})} value={m42} onChange={handleSetM42}
                   style={{width: 50}}/>],
        [
            <input className={cx('input51', {error: m51Error})} value={m51} onChange={handleSetM51}
                   style={{width: 50}}/>,
            <input className={cx('input52', {error: m52Error})} value={m52} onChange={handleSetM52}
                   style={{width: 50}}/>],
        [
            <input className={cx('input61', {error: m61Error})} value={m61} onChange={handleSetM61}
                   style={{width: 50}}/>,
            <input className={cx('input62', {error: m62Error})} value={m62} onChange={handleSetM62}
                   style={{width: 50}}/>],
        [
            <input className={cx('input71', {error: m71Error})} value={m71} onChange={handleSetM71}
                   style={{width: 50}}/>,
            <input className={cx('input72', {error: m72Error})} value={m72} onChange={handleSetM72}
                   style={{width: 50}}/>],
        [
            <input className={cx('input81', {error: m81Error})} value={m81} onChange={handleSetM81}
                   style={{width: 50}}/>,
            <input className={cx('input82', {error: m82Error})} value={m82} onChange={handleSetM82}
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
                            postfix={<Button id={'check1'} variant='primary'
                                             style={{alignSelf: "center", margin: 'auto', display: 'block'}}
                                             onClick={checkTaskOne}>Проверить</Button>}
                            matrix={[[<span>число строк</span>, <input type="text" id={'task1part1input1'}
                                                                       className={cx('input-value-vector-3', {error: p1Error})}
                                                                       value={p1}
                                                                       onChange={handleSetP1}/>],
                                [<span>число столбцов</span>, <input type="text" id={'task1part1input2'}
                                                                     className={cx('input-value-vector-3', {error: p2Error})}
                                                                     value={p2}
                                                                     onChange={handleSetP2}/>]
                            ]}
                    />
                </div>
                <div
                    className={cx('task-text-description-vector', {grayText: progress >= 2 || progress === 0})}>{descriptionTaskTwo}</div>
                <div id={'task2'} hidden={true}>
                    <p className={'task-text-description-vector'}>Стратегии коалиции 4
                        игрока</p>
                    <Matrix matrix={data}
                            size={'small'} ariaLabel={"a dense table"}
                            style={{width: "50%"}}
                            head={
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={'center'} className={'table-head-cell'}/>
                                        <TableCell align={'center'} className={'table-head-cell'}>
                                            1
                                        </TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>
                                            2
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            }
                            firstColumn={[
                                <TableCell align={'center'} className={'table-head-cell'}>1 1 1</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>1 1 2</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>1 2 1</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>1 2 2</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>2 1 1</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>2 1 2</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>2 2 1</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>2 2 2</TableCell>
                            ]}

                    >

                    </Matrix>
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

export default observer(Type3Matrix);