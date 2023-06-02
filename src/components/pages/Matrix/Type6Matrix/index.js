import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Latex from "react-latex";
import {isEqual} from "lodash/lang";
import classNames from "classnames/bind";
import styles from "../Type3Matrix/styles.css";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const cx = classNames.bind(styles)


const description = "Найдите верхнюю, нижнюю цены игры и гарантированный выигрыш для коалиционной игры первого уровня 1 и 2 игрока \n против остальных и укажите, существует ли решение в чистых стратегиях, или нет. \n        Для этого:"
const descriptionTaskOne = "1. Заполните столбец α (столбец минимумов строк: α = min α ) и строку β (строка максимумов столбцов: β = max α ),\nпосле чего найдите максимальное из чисел α : α = max α и минимальное из чисел β : β = β ."
const descriptionTaskTwo = "2. Введите значения нижней, верхней цены игры и гарантированного выигрыша в соответствующие поля и укажите, \nсуществует ли решение игры в чистых стратегиях. "
const descriptionMatrix = "Стратегии коалиции 3 и 4 игроков"

const Type6Matrix = ({next, task}) => {
    const {labs} = useContext(Context)
    const navigation = useNavigate();
    const [tries, setTries] = useState(3)
    const [success, setSuccess] = useState(false);

    const handleClick = useCallback(() => {
        labs.addResult(6, tries > 0 ? tries : 0)
        navigation(`${ROUTE__MATRIX_LABS}/7`)
        next()
    }, [tries])

    const matrixVariant = []
    let el = 0;
    for (let i = 0; i < 4; i++) {
        const row = [];

        for (let j = 0; j < 4; j++) {
            row.push(task[el][0] + task[el][1]);
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
        const maxValues = Array.from({length: 4}, () => -1000);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
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

    const [alpha1, setAlpha1] = useState('');
    const [alpha2, setAlpha2] = useState('');
    const [alpha3, setAlpha3] = useState('');
    const [alpha4, setAlpha4] = useState('');
    const [alpha, setAlpha] = useState('');
    const [beta1, setBeta1] = useState('');
    const [beta2, setBeta2] = useState('');
    const [beta3, setBeta3] = useState('');
    const [beta4, setBeta4] = useState('');
    const [beta, setBeta] = useState('');


    const [alpha1Error, setAlpha1Error] = useState(false);
    const [alpha2Error, setAlpha2Error] = useState(false);
    const [alpha3Error, setAlpha3Error] = useState(false);
    const [alpha4Error, setAlpha4Error] = useState(false);
    const [alphaError, setAlphaError] = useState(false);
    const [beta1Error, setBeta1Error] = useState(false);
    const [beta2Error, setBeta2Error] = useState(false);
    const [beta3Error, setBeta3Error] = useState(false);
    const [beta4Error, setBeta4Error] = useState(false);
    const [betaError, setBetaError] = useState(false);

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
    const handleSetAlpha = useCallback(e => {
        setAlpha(e.target.value);
    }, []);
    const handleSetBeta1 = useCallback(e => {
        setBeta1(e.target.value);
    }, []);
    const handleSetBeta2 = useCallback(e => {
        setBeta2(e.target.value);
    }, []);
    const handleSetBeta3 = useCallback(e => {
        setBeta3(e.target.value);
    }, []);
    const handleSetBeta4 = useCallback(e => {
        setBeta4(e.target.value);
    }, []);
    const handleSetBeta = useCallback(e => {
        setBeta(e.target.value);
    }, []);

    const showAnswersPart1 = () => {
        setAlpha1(answers.maxValues[0]);
        setAlpha2(answers.maxValues[1]);
        setAlpha3(answers.maxValues[2]);
        setAlpha4(answers.maxValues[3]);
        setAlpha(answers.minMaxValue);
        setBeta1(answers.minValues[0]);
        setBeta2(answers.minValues[1]);
        setBeta3(answers.minValues[2]);
        setBeta4(answers.minValues[3]);
        setBeta(answers.maxMinValue);
    }

    const checkTaskOne = () => {
        if (tries < 1) {
            document.getElementById("check1").hidden = true;
            document.getElementById("task2").hidden = false;
            showAnswersPart1()
        }
        let error = false

        if (!isEqual(alpha1, answers.maxValues[0])
            // && !isEmpty(newP1)
        ) {
            setAlpha1Error(true)
            error = true
        } else {
            setAlpha1Error(false)
        }
        if (!isEqual(alpha2, answers.maxValues[1].toString())
            // && !isEmpty(newP2)
        ) {
            setAlpha2Error(true)
            error = true
        } else {
            setAlpha2Error(false)
        }
        if (!isEqual(alpha3, answers.maxValues[2].toString())
            // && !isEmpty(newP3)
        ) {
            setAlpha3Error(true)
            error = true
        } else {
            setAlpha3Error(false)
        }
        if (!isEqual(alpha4, answers.maxValues[3].toString())
            // && !isEmpty(newP4)
        ) {
            setAlpha4Error(true)
            error = true
        } else {
            setAlpha4Error(false)
        }
        if (!isEqual(alpha, answers.minMaxValue.toString())
            // && !isEmpty(newS1)
        ) {
            setAlphaError(true)
            error = true
        } else {
            setAlphaError(false)
        }
        if (!isEqual(beta1, answers.minValues[0])
            // && !isEmpty(newS2)
        ) {
            setBeta1Error(true)
            error = true
        } else {
            setBeta1Error(false)
        }
        if (!isEqual(beta2, answers.minValues[1])
            // && !isEmpty(newS3)
        ) {
            setBeta2Error(true)
            error = true
        } else {
            setBeta2Error(false)
        }
        if (!isEqual(beta3, answers.minValues[2])
            // && !isEmpty(newP3)
        ) {
            setBeta3Error(true)
            error = true
        } else {
            setBeta3Error(false)
        }
        if (!isEqual(beta4, answers.minValues[3])
            // && !isEmpty(newP4)
        ) {
            setBeta4Error(true)
            error = true
        } else {
            setBeta4Error(false)
        }
        if (!isEqual(beta, answers.maxMinValue)
            // && !isEmpty(newS4)
        ) {
            setBetaError(true)
            error = true
        } else {
            setBetaError(false)
        }

        if (!error) {
            showAnswersPart1()
            for (let i = 1; i < 5; i++) {
                document.getElementById("alpha" + i).readOnly = true;
            }
            document.getElementById("alpha").readOnly = true;
            for (let i = 1; i < 5; i++) {
                document.getElementById("beta" + i).readOnly = true;
            }
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

    const [radio1, setRadio1] = useState(false)
    const [radio2, setRadio2] = useState(false)


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
        setV1(answers.maxMinValue);
        setV2(answers.minMaxValue);
        setV3(answers.maxMinValue < answers.minMaxValue ? answers.maxMinValue : answers.minMaxValue);
        setV4();
    }

    const checkTaskTwo = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswersPart2()
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
        [<label style={{width: 50}}>{matrixVariant[0][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[0][1]}</label>,
            <label style={{width: 50}}>{matrixVariant[0][2]}</label>,
            <label style={{width: 50}}>{matrixVariant[0][3]}</label>,
            <input id={'beta1'} className={cx('beta1', {error: beta1Error})} value={beta1} onChange={handleSetBeta1}
                   style={{width: 50}}/>
        ],
        [<label style={{width: 50}}>{matrixVariant[1][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[1][1]}</label>,
            <label style={{width: 50}}>{matrixVariant[1][2]}</label>,
            <label style={{width: 50}}>{matrixVariant[1][3]}</label>,
            <input id={'beta2'} className={cx('beta2', {error: beta2Error})} value={beta2} onChange={handleSetBeta2}
                   style={{width: 50}}/>,
        ],
        [<label style={{width: 50}}>{matrixVariant[2][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[2][1]}</label>,
            <label style={{width: 50}}>{matrixVariant[2][2]}</label>,
            <label style={{width: 50}}>{matrixVariant[2][3]}</label>,
            <input id={'beta3'} className={cx('beta3', {error: beta3Error})} value={beta3} onChange={handleSetBeta3}
                   style={{width: 50}}/>,
            <input id={'beta'} className={cx('beta', {error: betaError})} value={beta} onChange={handleSetBeta}
                   style={{width: 50}}/>
        ],
        [<label style={{width: 50}}>{matrixVariant[3][0]}</label>,
            <label style={{width: 50}}>{matrixVariant[3][1]}</label>,
            <label style={{width: 50}}>{matrixVariant[3][2]}</label>,
            <label style={{width: 50}}>{matrixVariant[3][3]}</label>,
            <input id={'beta4'} className={cx('beta4', {error: beta4Error})} value={beta4} onChange={handleSetBeta4}
                   style={{width: 50}}/>
        ],
        [
            <input id={'alpha1'} className={cx('alpha1', {error: alpha1Error})} value={alpha1}
                   onChange={handleSetAlpha1} style={{width: 50}}/>,
            <input id={'alpha2'} className={cx('alpha2', {error: alpha2Error})} value={alpha2}
                   onChange={handleSetAlpha2} style={{width: 50}}/>,
            <input id={'alpha3'} className={cx('alpha3', {error: alpha3Error})} value={alpha3}
                   onChange={handleSetAlpha3} style={{width: 50}}/>,
            <input id={'alpha4'} className={cx('alpha4', {error: alpha4Error})} value={alpha4}
                   onChange={handleSetAlpha4} style={{width: 50}}/>
        ],
        ['', '',
            <input id={'alpha'} className={cx('alpha', {error: alphaError})} value={alpha} onChange={handleSetAlpha}
                   style={{width: 50}}/>
        ]
    ]

    const handleClickradio1 = () => {
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
    return (
        <div style={{
            width: '100%',
            height: '100%',
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 6</p>

            // FIXME: изменять цвет текста при переходе к некст пункту

            <p>{description}</p>
            <p>{descriptionTaskOne}</p>
            <p className={''}>{descriptionTaskTwo}</p>
            <p>{descriptionMatrix}</p>
            <div style={{display: "flex"}}>
                <div>
                    <Matrix matrix={data}
                            size={'small'} ariaLabel={"a dense table"}
                            head={
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={'center'} className={'table-head-cell'}/>
                                        <TableCell align={'center'} className={'table-head-cell'}>β1</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>β2</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>β3</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>β4</TableCell>
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
                                <TableCell align={'center'} className={'table-head-cell'}>βi</TableCell>,
                                <TableCell align={'center'} className={'table-head-cell'}>β</TableCell>,
                            ]}
                    >

                    </Matrix>

                    {
                        !success &&
                        <Button id={'check1'} variant='primary' style={{alignSelf: "self-end"}}
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
                            <div style={{display: "flex", gap: 5}}>
                                <label htmlFor="task2part31">
                                    <input type="radio" name="task2part31" checked={radio1}
                                           onClick={handleClickradio1} id={'task2part31'} onChange={() => null}/>
                                    &nbsp;существует
                                </label></div>],
                        ['', <div style={{display: "flex", gap: 5}}>
                            <label htmlFor="task2part32">
                                <input type="radio" name="task2part31" id={'task2part32'} checked={radio2}
                                       onClick={handleClickRadio2} onChange={() => null}/>&nbsp;не существует</label>
                        </div>]
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

export default observer(Type6Matrix);