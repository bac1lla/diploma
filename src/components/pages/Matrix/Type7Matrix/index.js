import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import {isEqual} from "lodash/lang";
import classNames from "classnames/bind";
import styles from "../Type3Matrix/styles.css";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const cx = classNames.bind(styles)


const description = "Найдите верхнюю, нижнюю цены игры и гарантированный выигрыш для коалиционной игры первого уровня 1, 2 и 3 игрока \n против остальных и укажите, существует ли решение в чистых стратегиях, или нет. \n        Для этого:"
const descriptionTaskOne = "1. Заполните столбец α (столбец минимумов строк: α = min α ) и строку β  (строка максимумов столбцов: β = max α ),\nпосле чего найдите максимальное из чисел α : α = max α и минимальное из чисел β : β = β ."
const descriptionTaskTwo = "2. Введите значения нижней, верхней цены игры и гарантированного выигрыша в соответствующие поля и укажите, \nсуществует ли решение игры в чистых стратегиях. "
const descriptionMatrix = "Стратегии 4 игрока"
const Type7Matrix = ({next, task}) => {
    const {labs, user} = useContext(Context)
    const navigation = useNavigate();
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(0)

    const handleClick = useCallback(() => {
        labs.addResult(7, tries > 0 ? tries : 0)
        localStorage.setItem('duyn39*&N#mdp>)I_#H G@#BLDS_@#((ND&&D%%#@', 'sdif89br384sdgf77839ds8yf9(MYF&DST)NMW<_U_*MY$#*NYX<_<FJ<SBIDF')
        const nextStep = next()
        navigation(`${ROUTE__MATRIX_LABS}/${nextStep}`)
    }, [tries, next, labs])

    const matrixVariant = []
    let el = 0;
    for (let i = 0; i < 8; i++) {
        const row = [];

        for (let j = 0; j < 2; j++) {
            row.push(task[el][0] + task[el][1] + task[el][3]);
            el++;
        }

        matrixVariant.push(row)
    }

    const answers = useMemo(() => findMinsMaxs(matrixVariant))

    function findMinsMaxs(matrixV) {
        // Helper function to get the minimum value in an array
        const getMinValue = (arr) => Math.min(...arr);

        // Helper function to get the maximum value in an array
        const getMaxValue = (arr) => Math.max(...arr);

        // Helper function to generate a random integer between min and max (inclusive)
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Initialize the matrix
        const matrix = matrixV;


        // Find the minimum value in each row
        const minValues = matrix.map((row) => getMinValue(row));

        // Find the maximum value among the minimum values
        const maxMinValue = getMaxValue(minValues);

        // Find the maximum value in each column
        const maxValues = Array.from({length: 2}, () => -20);

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 2; j++) {
                if (matrix[i][j] > maxValues[j]) {
                    maxValues[j] = matrix[i][j];
                }
            }
        }

        // Find the minimum value among the maximum values
        const minMaxValue = getMinValue(maxValues);


        return {
            maxValues,
            minValues,
            maxMinValue,
            minMaxValue
        };
    }

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
        setBeta1(answers.maxValues[0]);
        setBeta2(answers.maxValues[1]);
        setBeta(answers.minMaxValue);
        setAlpha1(answers.minValues[0]);
        setAlpha2(answers.minValues[1]);
        setAlpha3(answers.minValues[2]);
        setAlpha4(answers.minValues[3]);
        setAlpha5(answers.minValues[4]);
        setAlpha6(answers.minValues[5]);
        setAlpha7(answers.minValues[6]);
        setAlpha8(answers.minValues[7]);
        setAlpha(answers.maxMinValue);
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
            showAnswersPart1()
            setProgress(prev => prev + 1);
        }
        let error = false

        if (!isEqual(beta1, answers.maxValues[0].toString())
            // && !isEmpty(newS2)
        ) {
            setBeta1Error(true)
            error = true
        } else {
            setBeta1Error(false)
        }
        if (!isEqual(beta2, answers.maxValues[1].toString())
            // && !isEmpty(newS3)
        ) {
            setBeta2Error(true)
            error = true
        } else {
            setBeta2Error(false)
        }
        if (!isEqual(beta, answers.minMaxValue.toString())
            // && !isEmpty(newS4)
        ) {
            setBetaError(true)
            error = true
        } else {
            setBetaError(false)
        }
        if (!isEqual(alpha1, answers.minValues[0].toString())
            // && !isEmpty(newP1)
        ) {
            setAlpha1Error(true)
            error = true
        } else {
            setAlpha1Error(false)
        }
        if (!isEqual(alpha2, answers.minValues[1].toString())
            // && !isEmpty(newP2)
        ) {
            setAlpha2Error(true)
            error = true
        } else {
            setAlpha2Error(false)
        }
        if (!isEqual(alpha3, answers.minValues[2].toString())
            // && !isEmpty(newP3)
        ) {
            setAlpha3Error(true)
            error = true
        } else {
            setAlpha3Error(false)
        }
        if (!isEqual(alpha4, answers.minValues[3].toString())
            // && !isEmpty(newP4)
        ) {
            setAlpha4Error(true)
            error = true
        } else {
            setAlpha4Error(false)
        }
        if (!isEqual(alpha5, answers.minValues[4].toString())
            // && !isEmpty(newP5)
        ) {
            setAlpha5Error(true)
            error = true
        } else {
            setAlpha5Error(false)
        }
        if (!isEqual(alpha6, answers.minValues[5].toString())
            // && !isEmpty(newP6)
        ) {
            setAlpha6Error(true)
            error = true
        } else {
            setAlpha6Error(false)
        }
        if (!isEqual(alpha7, answers.minValues[6].toString())
            // && !isEmpty(newP7)
        ) {
            setAlpha7Error(true)
            error = true
        } else {
            setAlpha7Error(false)
        }
        if (!isEqual(alpha8, answers.minValues[7].toString())
            // && !isEmpty(newP8)
        ) {
            setAlpha8Error(true)
            error = true
        } else {
            setAlpha8Error(false)
        }
        if (!isEqual(alpha, answers.maxMinValue.toString())
            // && !isEmpty(newS1)
        ) {
            setAlphaError(true)
            error = true
        } else {
            setAlphaError(false)
        }

        if (!error) {
            showAnswersPart1()
            setProgress(prev => prev + 1);
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

    const [v1Error, setV1Error] = useState(false);
    const [v2Error, setV2Error] = useState(false);
    const [v3Error, setV3Error] = useState(false);

    const [radio1, setRadio1] = useState(false)
    const [radio2, setRadio2] = useState(false)

    const [radio1Error, setRadio1Error] = useState(false)
    const [radio2Error, setRadio2Error] = useState(false)


    const handleSetV1 = useCallback(e => {
        setV1(e.target.value);
    }, []);
    const handleSetV2 = useCallback(e => {
        setV2(e.target.value);
    }, []);
    const handleSetV3 = useCallback(e => {
        setV3(e.target.value);
    }, []);

    const showAnswersPart2 = () => {
        setV1(answers.maxMinValue);
        setV2(answers.minMaxValue);
        setV3(answers.maxMinValue < answers.minMaxValue ? answers.maxMinValue : answers.minMaxValue);
        if (answers.minMaxValue === answers.maxMinValue) {
            handleClickRadio1()
        } else {
            handleClickRadio2()
        }
    }

    const handleClickRadio1 = () => {
        setRadio1(prev => {
            setRadio2(prev)
            return !prev
        })
    }

    const handleClickRadio2 = () => {
        setRadio2(prev => {
            setRadio1(prev)
            return !prev
        })
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswersPart2()
            setProgress(prev => prev + 1);
            return;
        }
        let error = false

        if (!isEqual(v1, answers.maxMinValue.toString())
            // && !isEmpty(newP1)
        ) {
            setV1Error(true)
            error = true
        } else {
            setV1Error(false)
        }
        if (!isEqual(v2, answers.minMaxValue.toString())
            // && !isEmpty(newP2)
        ) {
            setV2Error(true)
            error = true
        } else {
            setV2Error(false)
        }
        if (!isEqual(v3, (answers.maxMinValue < answers.minMaxValue ? answers.maxMinValue : answers.minMaxValue).toString())
            // && !isEmpty(newP3)
        ) {
            setV3Error(true)
            error = true
        } else {
            setV3Error(false)
        }

        // FIXME: (мб и не зафиксится) radio не обводится ошибкой

        if (answers.maxMinValue === answers.minMaxValue) {
            if (!radio1) {
                setRadio1Error(true)
                error = true
            } else {
                setRadio1Error(false)
            }
        } else {
            if (!radio2) {
                setRadio2Error(true)
                error = true
            } else {
                setRadio2Error(false)
            }
        }


        if (!error) {
            setSuccess(true);
            setProgress(prev => prev + 1);
            return;
        }

        setTries(prev => prev - 1)
    }

    const data = [
        [<label style={{width: 50}}>{matrixVariant[0][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[0][1]}</label>,
            <input id={'alpha1'} className={cx('alpha1', {error: alpha1Error})} value={alpha1}
                   onChange={handleSetAlpha1} style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[1][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[1][1]}</label>,
            <input id={'alpha2'} className={cx('alpha2', {error: alpha2Error})} value={alpha2}
                   onChange={handleSetAlpha2} style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[2][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[2][1]}</label>,
            <input id={'alpha3'} className={cx('alpha3', {error: alpha3Error})} value={alpha3}
                   onChange={handleSetAlpha3} style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[3][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[3][1]}</label>,
            <input id={'alpha4'} className={cx('alpha4', {error: alpha4Error})} value={alpha4}
                   onChange={handleSetAlpha4} style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[4][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[4][1]}</label>,
            <input id={'alpha5'} className={cx('alpha5', {error: alpha5Error})} value={alpha5}
                   onChange={handleSetAlpha5} style={{width: 50}}/>,
            <input id={'alpha'} className={cx('alpha', {error: alpha1Error})} value={alpha} onChange={handleSetAlpha}
                   style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[5][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[5][1]}</label>,
            <input id={'alpha6'} className={cx('alpha6', {error: alpha6Error})} value={alpha6}
                   onChange={handleSetAlpha6} style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[6][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[6][1]}</label>,
            <input id={'alpha7'} className={cx('alpha7', {error: alpha7Error})} value={alpha7}
                   onChange={handleSetAlpha7} style={{width: 50}}/>],
        [<label style={{width: 50}}>{matrixVariant[7][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[7][1]}</label>,
            <input id={'alpha8'} className={cx('alpha8', {error: alpha8Error})} value={alpha8}
                   onChange={handleSetAlpha8} style={{width: 50}}/>],
        [
            <input id={'beta1'} className={cx('beta1', {error: beta1Error})} value={beta1} onChange={handleSetBeta1}
                   style={{width: 50}}/>,
            <input id={'beta2'} className={cx('beta2', {error: beta2Error})} value={beta2} onChange={handleSetBeta2}
                   style={{width: 50}}/>],
        [
            <input id={'beta'} className={cx('beta', {error: betaError})} value={beta} onChange={handleSetBeta}
                   style={{width: 50}}/>]
    ]

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: "column",
            // justifyContent: 'space-between',
            padding: '0 5% 1% 5%',
            overflow: 'auto',
            margin: 'auto',
        }}>
            <div className={'task-text-description-vector'}>{description}</div>
            <div className={cx('task-text-description-vector', {grayText: progress > 0})}>{descriptionTaskOne}</div>
            <div
                className={cx('task-text-description-vector', {grayText: progress >= 2 || progress === 0})}>{descriptionTaskTwo}</div>
            <div className={'task-text-description-vector'}>{descriptionMatrix}</div>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                <Matrix matrix={data} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}
                        size={'small'} ariaLabel={"a dense table"}
                        head={
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'center'} className={'table-head-cell'}/>
                                    <TableCell align={'center'} className={'table-head-cell'}>β1</TableCell>
                                    <TableCell align={'center'} className={'table-head-cell'}>β2</TableCell>
                                    <TableCell align={'center'} className={'table-head-cell'}>αi</TableCell>
                                    <TableCell align={'center'} className={'table-head-cell'}>α</TableCell>
                                </TableRow>
                            </TableHead>
                        }
                        firstColumn={[
                            <TableCell align={'center'} className={'table-head-cell'}>α1</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α2</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α3</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α4</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α5</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α6</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α7</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>α8</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>βi</TableCell>,
                            <TableCell align={'center'} className={'table-head-cell'}>β</TableCell>,
                        ]}
                        postfix={!success &&
                            <Button id={'check1'} variant='primary' style={{alignSelf: "center", marginLeft: 20}}
                                    onClick={checkTaskOne}>
                                {tries > 0 ? "Проверить" : "Показать ответы"}
                            </Button>}
                />
                <div style={{display: "flex", alignItems: 'center'}}>

                    <div id={'task2'} hidden={true} style={{marginLeft: "60px", marginTop: "45px"}}>
                        <Matrix matrix={[
                            [<label htmlFor="task2part1">Нижняя цена игры</label>,
                                <input id={'v1'} className={cx('v1', {error: v1Error})} value={v1}
                                       onChange={handleSetV1}
                                       type="text" style={{width: 50}}/>],
                            [<label htmlFor="task2part2">Верхняя цена игры</label>,
                                <input id={'v2'} className={cx('v2', {error: v2Error})} value={v2}
                                       onChange={handleSetV2}
                                       type="text" style={{width: 50}}/>],
                            [<label htmlFor="task2part2">Гарантированный выигрыш</label>,
                                <input id={'v3'} className={cx('v3', {error: v3Error})} value={v3}
                                       onChange={handleSetV3}
                                       type="text" style={{width: 50}}/>],
                            [<p>Решение в чистых стратегиях:</p>,
                                <div style={{display: "flex", gap: 5}} className={cx('radio1', {error: radio1Error})}>
                                    <label htmlFor="task2part31">
                                        <input type="radio" name="task2part31" checked={radio1}
                                               className={cx('radio1', {error: radio1Error})}
                                               onClick={handleClickRadio1} id={'task2part31'} onChange={() => null}/>
                                        &nbsp;существует
                                    </label></div>],
                            ['', <div style={{display: "flex", gap: 5}} className={cx('radio1', {error: radio2Error})}>
                                <label htmlFor="task2part32">
                                    <input type="radio" name="task2part31" id={'task2part32'} checked={radio2}
                                           className={cx('radio1', {error: radio2Error})}
                                           onClick={handleClickRadio2} onChange={() => null}/>&nbsp;не
                                    существует</label>
                            </div>]
                        ]} cellClassName={'cell-align-center'}
                        />
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

export default observer(Type7Matrix);
