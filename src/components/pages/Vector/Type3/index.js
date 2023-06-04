import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import classNames from "classnames/bind";
import {uniqueId} from "lodash";
import {delay} from "lodash/function";
import {isEmpty, isEqual} from "lodash/lang";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {ROUTE__RESULTS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Text from '../../../common/Text'
import Latex from 'react-latex'
import styles from './styles.css'


const description = 'Определите для каждой предложенной задачи все случаи, в которых x0 будет принадлежать области эффективныъхвекторных оценок, при условии, что x не принадлежит области эффективных векторных оценок'

const str1 = {
    value: 1,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n & g_{2}(x_{0}) > g_{2}(x)\n\\end{matrix}\\right.$'
}
const str2 = {
    value: 2,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\leq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str3 = {
    value: 3,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) < g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\geq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str4 = {
    value: 4,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n & g_{2}(x_{0}) < g_{2}(x)\n\\end{matrix}\\right.$'
}
const str5 = {
    value: 5,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) > g_{1}(x)\\\\ \n & g_{2}(x_{0}) < g_{2}(x)\n\\end{matrix}\\right.$'
}
const str6 = {
    value: 6,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n & g_{2}(x_{0}) < g_{2}(x)\n\\end{matrix}\\right.$'
}
const str7 = {
    value: 7,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) < g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\leq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str8 = {
    value: 8,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) > g_{1}(x)\\\\ \n & g_{2}(x_{0}) > g_{2}(x)\n\\end{matrix}\\right.$'
}
const str9 = {
    value: 9,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) < g_{1}(x\\\\ \n & g_{2}(x_{0}) < g_{2}(x\n\\end{matrix}\\right.$'
}
const str10 = {
    value: 10,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) > g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\geq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str11 = {
    value: 11,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) > g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\leq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str12 = {
    value: 12,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\geq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str13 = {
    value: 13,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) < g_{1}(x)\\\\ \n & g_{2}(x_{0}) > g_{2}(x)\n\\end{matrix}\\right.$'
}
const str14 = {
    value: 14,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\leq g_{2}(x)\n\\end{matrix}\\right.$'
}
const str15 = {
    value: 15,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n & g_{2}(x_{0}) > g_{2}(x)\n\\end{matrix}\\right.$'
}
const str16 = {
    value: 16,
    label: '$\\left\\{\\begin{matrix}\n & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n & g_{2}(x_{0}) \\geq g_{2}(x)\n\\end{matrix}\\right.$'
}

const labTask = [str1, str2, str3, str4, str5, str6, str7, str8, str9, str10, str11, str12, str13, str14, str15, str16]

function shuffle(array) {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
}

const createTask = (array) => {
    const newArray = [];
    for (let i = 0; i < 4; i++) {
        newArray[i] = [];
        for (let j = 0; j < 4; j++) {
            newArray[i][j] =
                <Latex style={{width: '20%'}}>{(i * 4 + j + 1) + ') ' + array[i * 4 + j].label}</Latex>
        }
    }
    return newArray;
}

const answerP1 = [4, 7, 9]
const answerP2 = [3, 13, 15]
const answerP3 = [5, 6, 11]
const answerP4 = [1, 8, 10]
const answerS1 = [5]
const answerS2 = [8]
const answerS3 = [9]
const answerS4 = [13]

const shuffledArray = shuffle(labTask)

const prepareValue = (value) => {
    let arr = value?.match(/\d+/g, '')?.map(e => +e);
    return arr?.map(number => shuffledArray[number - 1]?.value || 0)?.sort((a, b) => a - b)
}

const prepareAnswers = (answer) => {

    return answer?.map(number => {
        for (let i = 0; i < shuffledArray.length; i++) {
            if (shuffledArray[i]?.value === number) {
                return i + 1
            }
        }
    })?.sort((a, b) => a - b)?.join(', ')
}

const cx = classNames.bind(styles)

const explanation = 'Пример: 1,2,5,8,10,12';

const Type3 = ({next}) => {
    const {labs, user} = useContext(Context)
    const navigate = useNavigate();
    const tasksArray = createTask(shuffledArray)
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);

    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');
    const [p3, setP3] = useState('');
    const [p4, setP4] = useState('');

    const [s1, setS1] = useState('');
    const [s2, setS2] = useState('');
    const [s3, setS3] = useState('');
    const [s4, setS4] = useState('');

    const [p1Error, setP1Error] = useState(false);
    const [p2Error, setP2Error] = useState(false);
    const [p3Error, setP3Error] = useState(false);
    const [p4Error, setP4Error] = useState(false);

    const [s1Error, setS1Error] = useState(false);
    const [s2Error, setS2Error] = useState(false);
    const [s3Error, setS3Error] = useState(false);
    const [s4Error, setS4Error] = useState(false);

    const handleSetP1 = useCallback(e => {
        setP1(e.target.value);
    }, []);
    const handleSetP2 = useCallback(e => {
        setP2(e.target.value);
    }, []);
    const handleSetP3 = useCallback(e => {
        setP3(e.target.value);
    }, []);
    const handleSetP4 = useCallback(e => {
        setP4(e.target.value);
    }, []);

    const handleSetS1 = useCallback(e => {
        setS1(e.target.value);
    }, []);
    const handleSetS2 = useCallback(e => {
        setS2(e.target.value);
    }, []);
    const handleSetS3 = useCallback(e => {
        setS3(e.target.value);
    }, []);
    const handleSetS4 = useCallback(e => {
        setS4(e.target.value);
    }, []);

    const data = [
        ['', 'По Парето', 'По Слейтеру'],
        ['g1(x) -> min; g2(x) -> min',
            <input className={cx('input-value-vector-3', {error: p1Error})} value={p1} onChange={handleSetP1}/>,
            <input className={cx('input-value-vector-3', {error: s1Error})} value={s1} onChange={handleSetS1}/>],
        ['g1(x) -> min; g2(x) -> max',
            <input className={cx('input-value-vector-3', {error: p2Error})} value={p2} onChange={handleSetP2}/>,
            <input className={cx('input-value-vector-3', {error: s2Error})} value={s2} onChange={handleSetS2}/>],
        ['g1(x) -> max; g2(x) -> min',
            <input className={cx('input-value-vector-3', {error: p3Error})} value={p3} onChange={handleSetP3}/>,
            <input className={cx('input-value-vector-3', {error: s3Error})} value={s3} onChange={handleSetS3}/>],
        ['g1(x) -> max; g2(x) -> max',
            <input className={cx('input-value-vector-3', {error: p4Error})} value={p4} onChange={handleSetP4}/>,
            <input className={cx('input-value-vector-3', {error: s4Error})} value={s4} onChange={handleSetS4}/>],
    ]

    const showAnswers = () => {
        let newP1 = prepareAnswers(answerP1)
        let newP2 = prepareAnswers(answerP2)
        let newP3 = prepareAnswers(answerP3)
        let newP4 = prepareAnswers(answerP4)
        let newS1 = prepareAnswers(answerS1)
        let newS2 = prepareAnswers(answerS2)
        let newS3 = prepareAnswers(answerS3)
        let newS4 = prepareAnswers(answerS4)

        setP1(newP1);
        setP2(newP2);
        setP3(newP3);
        setP4(newP4);
        setS1(newS1);
        setS2(newS2);
        setS3(newS3);
        setS4(newS4);
    }

    const postAnswers = async () => {
        await labs.addResult(3, tries > 0 ? tries : 0)
        localStorage.setItem('duyn39*&N#mdp>)I_#H G@#BLDS_@#((ND&&D%%#@', 'sdif89br384sdgf77839ds8yf9(MYF&DST)NMW<_U_*MY$#*NYX<_<FJ<SBIDF')
        const nextStep = next();
        navigate(`/vectors-optimizations/${nextStep}`);
    }

    const handleCheck = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswers()
        }
        let error = false

        let newP1 = prepareValue(p1)
        let newP2 = prepareValue(p2)
        let newP3 = prepareValue(p3)
        let newP4 = prepareValue(p4)
        let newS1 = prepareValue(s1)
        let newS2 = prepareValue(s2)
        let newS3 = prepareValue(s3)
        let newS4 = prepareValue(s4)

        if (!isEqual(newP1, answerP1)
            // && !isEmpty(newP1)
        ) {
            setP1Error(true)
            error = true
        } else {
            setP1Error(false)
        }
        if (!isEqual(newP2, answerP2)
            // && !isEmpty(newP2)
        ) {
            setP2Error(true)
            error = true
        } else {
            setP2Error(false)
        }
        if (!isEqual(newP3, answerP3)
            // && !isEmpty(newP3)
        ) {
            setP3Error(true)
            error = true
        } else {
            setP3Error(false)
        }
        if (!isEqual(newP4, answerP4)
            // && !isEmpty(newP4)
        ) {
            setP4Error(true)
            error = true
        } else {
            setP4Error(false)
        }
        if (!isEqual(newS1, answerS1)
            // && !isEmpty(newS1)
        ) {
            setS1Error(true)
            error = true
        } else {
            setS1Error(false)
        }
        if (!isEqual(newS2, answerS2)
            // && !isEmpty(newS2)
        ) {
            setS2Error(true)
            error = true
        } else {
            setS2Error(false)
        }
        if (!isEqual(newS3, answerS3)
            // && !isEmpty(newS3)
        ) {
            setS3Error(true)
            error = true
        } else {
            setS3Error(false)
        }
        if (!isEqual(newS4, answerS4)
            // && !isEmpty(newS4)
        ) {
            setS4Error(true)
            error = true
        } else {
            setS4Error(false)
        }

        if (!error) {
            setSuccess(true);
            return;
        }

        setTries(prev => prev - 1)
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: 'space-between',
            padding: '0 5% 1% 5%',
            overflow: 'auto',
            margin: 'auto',
        }}>
            <Text text={description} className={'task-text-description-vector'}/>
            <Matrix matrix={tasksArray}/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 0
            }}>
                <span style={{marginBottom: 0, padding: 0}}
                      className={'explanation-before-matrix task-text-description-vector'}>Эффективность:</span>
                <TableContainer component={Paper} style={{
                    minHeight: 210,
                }}>
                    <Table size={'small'} ariaLabel={"a dense table"}>
                        <TableBody>
                            {data.map((row, i) => (
                                <TableRow
                                    key={uniqueId()}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    {row.map((cell, i) => (
                                        <TableCell align="center" key={uniqueId()}>{cell}</TableCell>))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 0,
            }}>
                <p className={'vector-explanation'}>{explanation}</p>
                <div>
                    {
                        success &&
                        <Button variant='primary' style={{alignSelf: "self-end"}} onClick={postAnswers}>
                            Далее
                        </Button>
                    }
                    {
                        !success &&
                        <Button variant='primary' style={{alignSelf: "self-end"}}
                                onClick={handleCheck}>
                            {tries > 0 ? "Проверить" : "Показать ответы"}
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(Type3);


