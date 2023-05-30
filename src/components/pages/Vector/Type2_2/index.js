import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {isEmpty, isEqual} from "lodash/lang";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {randomInteger} from "../../../../helpers";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import styles from './styles.css'
import classNames from "classnames/bind";
import {tasks} from './tasks'

const cx = classNames.bind(styles)

const description = "Для критериев g1(x), g2(x) и g3(x), найдите области эффективных векторных оценок на множестве X={x1, x2, x3}, для всех предложенных задач"
const explanation = "Пример ввода: 1,4,5"

const prepareValue = (value) => {
    return value?.match(/\d+/g, '')?.map(e => +e)?.sort((a, b) => a - b)
}

const task = tasks[randomInteger(0, 14)]

const Type2_2 = ({next}) => {
    const {labs} = useContext(Context)
    const navigate = useNavigate();

    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);

    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');
    const [p3, setP3] = useState('');
    const [p4, setP4] = useState('');
    const [p5, setP5] = useState('');
    const [p6, setP6] = useState('');
    const [p7, setP7] = useState('');
    const [p8, setP8] = useState('');

    const [s1, setS1] = useState('');
    const [s2, setS2] = useState('');
    const [s3, setS3] = useState('');
    const [s4, setS4] = useState('');
    const [s5, setS5] = useState('');
    const [s6, setS6] = useState('');
    const [s7, setS7] = useState('');
    const [s8, setS8] = useState('');


    const [p1Error, setP1Error] = useState(false);
    const [p2Error, setP2Error] = useState(false);
    const [p3Error, setP3Error] = useState(false);
    const [p4Error, setP4Error] = useState(false);
    const [p5Error, setP5Error] = useState(false);
    const [p6Error, setP6Error] = useState(false);
    const [p7Error, setP7Error] = useState(false);
    const [p8Error, setP8Error] = useState(false);

    const [s1Error, setS1Error] = useState(false);
    const [s2Error, setS2Error] = useState(false);
    const [s3Error, setS3Error] = useState(false);
    const [s4Error, setS4Error] = useState(false);
    const [s5Error, setS5Error] = useState(false);
    const [s6Error, setS6Error] = useState(false);
    const [s7Error, setS7Error] = useState(false);
    const [s8Error, setS8Error] = useState(false);

    const handlePostResults = useCallback(() => {
        labs.addResult(4, tries > 0 ? tries : 0)
        navigate('/vectors-optimizations/5');
        next();
    }, [tries])

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
    const handleSetP5 = useCallback(e => {
        setP5(e.target.value);
    }, []);
    const handleSetP6 = useCallback(e => {
        setP6(e.target.value);
    }, []);
    const handleSetP7 = useCallback(e => {
        setP7(e.target.value);
    }, []);
    const handleSetP8 = useCallback(e => {
        setP8(e.target.value);
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
    const handleSetS5 = useCallback(e => {
        setS5(e.target.value);
    }, []);
    const handleSetS6 = useCallback(e => {
        setS6(e.target.value);
    }, []);
    const handleSetS7 = useCallback(e => {
        setS7(e.target.value);
    }, []);
    const handleSetS8 = useCallback(e => {
        setS8(e.target.value);
    }, []);

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
        ['По Парето', <input className={cx('task-2-1-input', {error: p1Error})} value={p1} onChange={handleSetP1}/>,
            <input className={cx('task-2-1-input', {error: p2Error})} value={p2} onChange={handleSetP2}/>,
            <input className={cx('task-2-1-input', {error: p3Error})} value={p3} onChange={handleSetP3}/>,
            <input className={cx('task-2-1-input', {error: p4Error})} value={p4} onChange={handleSetP4}/>,
            <input className={cx('task-2-1-input', {error: p5Error})} value={p5} onChange={handleSetP5}/>,
            <input className={cx('task-2-1-input', {error: p6Error})} value={p6} onChange={handleSetP6}/>,
            <input className={cx('task-2-1-input', {error: p7Error})} value={p7} onChange={handleSetP7}/>,
            <input className={cx('task-2-1-input', {error: p8Error})} value={p8} onChange={handleSetP8}/>],
        ['По Слейтеру', <input className={cx('task-2-1-input', {error: s1Error})} value={s1} onChange={handleSetS1}/>,
            <input className={cx('task-2-1-input', {error: s2Error})} value={s2} onChange={handleSetS2}/>,
            <input className={cx('task-2-1-input', {error: s3Error})} value={s3} onChange={handleSetS3}/>,
            <input className={cx('task-2-1-input', {error: s4Error})} value={s4} onChange={handleSetS4}/>,
            <input className={cx('task-2-1-input', {error: s5Error})} value={s5} onChange={handleSetS5}/>,
            <input className={cx('task-2-1-input', {error: s6Error})} value={s6} onChange={handleSetS6}/>,
            <input className={cx('task-2-1-input', {error: s7Error})} value={s7} onChange={handleSetS7}/>,
            <input className={cx('task-2-1-input', {error: s8Error})} value={s8} onChange={handleSetS8}/>]
    ]

    const showAnswers = () => {
        setP1(task?.answers[0]);
        setP2(task?.answers[1]);
        setP3(task?.answers[2]);
        setP4(task?.answers[3]);
        setP5(task?.answers[4]);
        setP6(task?.answers[5]);
        setP7(task?.answers[6]);
        setP8(task?.answers[7]);
        setS1(task?.answers[8]);
        setS2(task?.answers[9]);
        setS3(task?.answers[10]);
        setS4(task?.answers[11]);
        setS5(task?.answers[12]);
        setS6(task?.answers[13]);
        setS7(task?.answers[14]);
        setS8(task?.answers[15]);
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
        let newP5 = prepareValue(p5)
        let newP6 = prepareValue(p6)
        let newP7 = prepareValue(p7)
        let newP8 = prepareValue(p8)
        let newS1 = prepareValue(s1)
        let newS2 = prepareValue(s2)
        let newS3 = prepareValue(s3)
        let newS4 = prepareValue(s4)
        let newS5 = prepareValue(s5)
        let newS6 = prepareValue(s8)
        let newS7 = prepareValue(s7)
        let newS8 = prepareValue(s8)

        if (!isEqual(newP1, task?.answers[0])
            // && !isEmpty(newP1)
        ) {
            setP1Error(true)
            error = true
        } else {
            setP1Error(false)
        }
        if (!isEqual(newP2, task?.answers[1])
            // && !isEmpty(newP2)
        ) {
            setP2Error(true)
            error = true
        } else {
            setP2Error(false)
        }
        if (!isEqual(newP3, task?.answers[2])
            // && !isEmpty(newP3)
        ) {
            setP3Error(true)
            error = true
        } else {
            setP3Error(false)
        }
        if (!isEqual(newP4, task?.answers[3])
            // && !isEmpty(newP4)
        ) {
            setP4Error(true)
            error = true
        } else {
            setP4Error(false)
        }
        if (!isEqual(newP5, task?.answers[4])
            // && !isEmpty(newP5)
        ) {
            setP5Error(true)
            error = true
        } else {
            setP5Error(false)
        }
        if (!isEqual(newP6, task?.answers[5])
            // && !isEmpty(newP6)
        ) {
            setP6Error(true)
            error = true
        } else {
            setP6Error(false)
        }
        if (!isEqual(newP7, task?.answers[6])
            // && !isEmpty(newP7)
        ) {
            setP7Error(true)
            error = true
        } else {
            setP7Error(false)
        }
        if (!isEqual(newP8, task?.answers[7])
            // && !isEmpty(newP8)
        ) {
            setP8Error(true)
            error = true
        } else {
            setP8Error(false)
        }
        if (!isEqual(newS1, task?.answers[8])
            // && !isEmpty(newS1)
        ) {
            setS1Error(true)
            error = true
        } else {
            setS1Error(false)
        }
        if (!isEqual(newS2, task?.answers[9])
            // && !isEmpty(newS2)
        ) {
            setS2Error(true)
            error = true
        } else {
            setS2Error(false)
        }
        if (!isEqual(newS3, task?.answers[10])
            // && !isEmpty(newS3)
        ) {
            setS3Error(true)
            error = true
        } else {
            setS3Error(false)
        }
        if (!isEqual(newS4, task?.answers[11])
            // && !isEmpty(newS4)
        ) {
            setS4Error(true)
            error = true
        } else {
            setS4Error(false)
        }
        if (!isEqual(newS5, task?.answers[12])
            // && !isEmpty(newS5)
        ) {
            setS5Error(true)
            error = true
        } else {
            setS5Error(false)
        }
        if (!isEqual(newS6, task?.answers[13])
            // && !isEmpty(newS6)
        ) {
            setS6Error(true)
            error = true
        } else {
            setS6Error(false)
        }
        if (!isEqual(newS7, task?.answers[14])
            // && !isEmpty(newS7)
        ) {
            setS7Error(true)
            error = true
        } else {
            setS7Error(false)
        }
        if (!isEqual(newS8, task?.answers[15])
            // && !isEmpty(newS8)
        ) {
            setS8Error(true)
            error = true
        } else {
            setS8Error(false)
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
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>{description}</p>
            <Matrix matrix={task.task} style={{width: '90%'}}
                    head={
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'} className={'table-head-cell'}></TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x1</TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x2</TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x3</TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x4</TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x5</TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x6</TableCell>
                                <TableCell align={'center'} className={'table-head-cell'}>x7</TableCell>
                            </TableRow>
                        </TableHead>}
                    firstColumn={[<TableCell align={'center'} className={'table-head-cell'}>g1</TableCell>,
                        <TableCell align={'center'} className={'table-head-cell'}>g2</TableCell>,
                        <TableCell align={'center'} className={'table-head-cell'}>g3</TableCell>,]}
                    cellClassName={'table-cell'}
            />
            <Matrix matrix={data} style={{width: '90%', margin: 'auto'}}>
                <p>{explanation}</p>

            </Matrix>
            {
                success &&
                <Button variant='primary' style={{alignSelf: "self-end"}} onClick={handlePostResults}>
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
    );
};

export default observer(Type2_2);