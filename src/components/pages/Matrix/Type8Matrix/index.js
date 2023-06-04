import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LABS} from "../../../../constants/routes";
import {Context} from "../../../../index";
import Matrix from "../../../common/Matrix";
import Latex from "react-latex";
import Select from "react-select";
import classNames from "classnames/bind";
import styles from "../Type3Matrix/styles.css";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// import * as math from "mathjs"

const cx = classNames.bind(styles)


const description = "Найдите решение в смешанных стратегиях коалиционный игры вьторого уровня 1 и 2 игроков против остальных \n" +
    "(матричной игры игрока А против В (ввели обозначения А - коалиция 1 и 2 игроков, В - коалиция остальных игроков)). \n" +
    "Для этого: "
const descriptionTaskOne = "1. Выполните переход к преобразованной игре, задав число alpha >= 0. \n" +
    "(Преобразованная игра - игра с положительной матрицией (все ее элементы положительны) U: U = A + alpha * E, \n" +
    "где А - матрица исходной игры, Е - матрица размерности матрицы А с единичными элементами, α >= 0: U > 0)."
const descriptionTaskTwo = "2. Составьте две задачи линейного программирования (ЗЛП), к решению которыъ сводится решение преобразованной \n" +
    "игры в смешанных стратегиях."
const descriptionTaskThree = "3. По найденным решениям ЗЛП (X* и Y*) определите оптимальные смешанные стратегии игрока А - p \n" +
    "и игрока В - q и цену игры v"
const descriptionMatrix = "Матрица дохода s-того игрока при его игре против остальных: "

const task1Ender = '$; α:U=A+α*E>0(u_{i,j}>0);E=\\begin{pmatrix}\n' +
    '1 & ... & 1 \\\\\n' +
    '... & 1 & ... \\\\\n' +
    '1 & ... & 1\n' +
    '\\end{pmatrix}_{n*m}$'


const task2part1option1 = '$e_1$'

const task2part1option2 = '$e_2$'

const task2part2option1 = '$min$'

const task2part2option2 = '$max$'

const optionsE1E2 = [
    {
        value: '1',
        label: <Latex>{task2part1option1}</Latex>
    },
    {
        value: '2',
        label: <Latex>{task2part1option2}</Latex>
    },
]
const optionsMAXMIN = [
    {
        value: '1',
        label: <Latex>{task2part2option1}</Latex>
    },
    {
        value: '2',
        label: <Latex>{task2part2option2}</Latex>
    },
]
const optionsUUT = [
    {
        value: '1',
        label: <Latex>{'$U$'}</Latex>
    },
    {
        value: '2',
        label: <Latex>{'$U^T$'}</Latex>
    },
]
const optionsMoreLess = [
    {
        value: '1',
        label: <Latex>{'$\\geqslant$'}</Latex>
    },
    {
        value: '2',
        label: <Latex>{'$\\leqslant$'}</Latex>
    },
]
const Type8Matrix = ({next, task}) => {
    const {labs, user} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const [result, setResult] = useState(1);
    const [progress, setProgress] = useState(0)

    function simplex(A, b, c) {
        const numRows = A.length;
        const numColumns = A[0].length;

        // Create initial tableau
        let tableau = new Array(numRows + 1).fill().map(() => new Array(numColumns + numRows + 1).fill(0));
        for (let i = 0; i < numColumns; i++) {
            tableau[0][i] = c[i] * -1;
        }
        for (let i = 1; i <= numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                tableau[i][j] = A[i - 1][j];
            }
            tableau[i][numColumns + i - 1] = 1;
            tableau[i][numColumns + numRows] = b[i - 1];
        }

        // Iterate until optimal solution found
        let pivotColumnIndex, pivotRowIndex;
        while (true) {
            pivotColumnIndex = -1;
            for (let i = 0; i < numColumns + numRows; i++) {
                if (tableau[0][i] < 0) {
                    pivotColumnIndex = i;
                    break;
                }
            }
            if (pivotColumnIndex === -1) {
                break;
            }

            let minRatio = Infinity;
            for (let i = 1; i <= numRows; i++) {
                if (tableau[i][pivotColumnIndex] > 0 && tableau[i][numColumns + numRows] / tableau[i][pivotColumnIndex] < minRatio) {
                    minRatio = tableau[i][numColumns + numRows] / tableau[i][pivotColumnIndex];
                    pivotRowIndex = i;
                }
            }

            let pivotValue = tableau[pivotRowIndex][pivotColumnIndex];
            let pivotRow = tableau[pivotRowIndex].map(value => value / pivotValue);
            tableau = tableau.map((row, index) => {
                if (index === pivotRowIndex) {
                    return pivotRow;
                }
                let multiplier = row[pivotColumnIndex] / pivotValue;
                return row.map((value, idx) => value - multiplier * pivotRow[idx]);
            });
        }

        // Extract solution
        const solution = {};
        for (let i = 0; i < numColumns; i++) {
            let nonZeroIndices = [];
            let idx;
            for (idx = 1; idx <= numRows; idx++) {
                if (tableau[idx][i] === 1) {
                    nonZeroIndices.push(idx);
                } else if (tableau[idx][i] !== 0) {
                    break;
                }
            }
            if (nonZeroIndices.length === 1 && tableau[nonZeroIndices[0]][numColumns + numRows] === 0) {
                solution[i] = tableau[nonZeroIndices[0]][numColumns + i];
            }
        }
        solution.result = -tableau[0][numColumns + numRows];
        return solution;
    }

    const A = [[3, 0, 3, 7],
        [3, 0, 1, 2],
        [1, 2, 0, 7],
        [5, 7, 0, 0]];
    const b = [1, 1, 1, 1];
    const c = [1, 1, 1, 1];
    const solution = simplex(A, b, c);
    console.log(solution.result);

    const A1 = [[3, 3, 1, 5],
        [0, 0, 2, 7],
        [3, 1, 0, 0],
        [7, 2, 7, 0]];
    const b1 = [1, 1, 1, 1];
    const c1 = [1, 1, 1, 1];
    const solution1 = simplex(A1, b1, c1);
    console.log(solution1.result);

    const postResultsToBD = () => {
        const {name, group} = user.getUser();
        labs.postResultsToBd({name, group, lab: 'matrix'})
    }

    const handleClick = () => {
        labs.addResult(8, result)
        navigation(`${ROUTE__MATRIX_LABS}/results`)
        next();
        postResultsToBD()
    }

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

    const matrixVariantToLatex = '$A = A_{1,2}^2 = (a_{1,2 i,j}^2)_{n*m} = \\left(\n' +
        '\\begin{matrix}\n' +
        matrixVariant[0][0] + ' & ' + matrixVariant[0][1] + ' & ' + matrixVariant[0][2] + ' & ' + matrixVariant[0][3] + ' \\\\\n' +
        matrixVariant[1][0] + ' & ' + matrixVariant[1][1] + ' & ' + matrixVariant[1][2] + ' & ' + matrixVariant[1][3] + ' \\\\\n' +
        matrixVariant[2][0] + ' & ' + matrixVariant[2][1] + ' & ' + matrixVariant[2][2] + ' & ' + matrixVariant[2][3] + ' \\\\\n' +
        matrixVariant[3][0] + ' & ' + matrixVariant[3][1] + ' & ' + matrixVariant[3][2] + ' & ' + matrixVariant[3][3] + ' \\\\\n' +
        '\\end{matrix}\n' +
        '\\right)$'

    return (
        <div style={{
            width: '100%',
            height: '100%',
            // display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <p>Задание 8</p>
            <p>{description}</p>
            <p className={cx({grayText: progress > 0})}>{descriptionTaskOne}</p>
            <p className={cx({grayText: progress > 1 || progress === 0})}>{descriptionTaskTwo}</p>
            <p className={cx({grayText: progress > 2 || progress < 2})}>{descriptionTaskThree}</p>
            <p color="grey">{descriptionMatrix}</p>
            <p>Матрица игры:</p>
            <div style={{display: "flex"}}>
                <div>
                    <div>
                        <Latex>{matrixVariantToLatex}</Latex>
                    </div>

                    <div id="task1">
                        <p>Переход к преобразованной паре</p>
                        <Latex>{'$α =$'}</Latex>
                        <input type="text" id="task1answer" style={{width: 40}}/>
                        <label htmlFor="task1answer"><Latex>{task1Ender}</Latex></label>

                        <Button variant='primary' style={{alignSelf: "self-end"}}
                                onClick={handleClick}>Проверить</Button>
                    </div>

                    <div id="task2">
                        <Matrix matrix={[
                            [<div>
                                <Latex>{'$e_1=(1,...,1)^T\\in{R}$'}</Latex>
                                <input type="text" id="task2part1formula1" style={{width: 40}}/>
                            </div>,
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Latex>{'$($'}</Latex>
                                    <Select id={'task2part2formula1'} options={optionsE1E2}/>
                                </div>,
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Latex>{"$, X)->$"}</Latex>
                                    <Select id={'task2part2formula1'} options={optionsMAXMIN}/>
                                    <Latex>{"$X \\in R_x$"}</Latex>
                                </div>, '', '',
                                <div>
                                    <Latex>{"$($"}</Latex>
                                    <Select id={'task2part3formula1'} options={optionsE1E2}/>
                                    <Latex>{"$,Y)->$"}</Latex>
                                </div>,
                                <div>
                                    <Select options={optionsMAXMIN}/>
                                    <Latex>{"$Y\\in{R_y}$"}</Latex>
                                </div>, '', ''
                            ],
                            [
                                <div>
                                    <Latex>{'$e_2=(1,...,1)^T\\in{R}$'}</Latex>
                                    <input type="text" id="task2part1formula2" style={{width: 40}}/>
                                </div>,
                                <div>
                                    <Latex>{'$R_X=X:$'}</Latex>
                                    <Select id={'task2part2formula2'} options={optionsUUT}/>
                                    <Latex>{'$*X$'}</Latex>
                                </div>,
                                <div>
                                    <Select options={optionsMoreLess}/>
                                </div>,
                                <div>
                                    <Select options={optionsE1E2}/>
                                    <Latex>{'$,X$'}</Latex>
                                </div>,
                                <div>
                                    <Select options={optionsMoreLess}/>
                                    <Latex>{'$0>$'}</Latex>
                                </div>,
                                <div>
                                    <Latex>{'$= Y:$'}</Latex>
                                    <Select id={'task2part2formula2'} options={optionsUUT}/>
                                    <Latex>{'$*Y$'}</Latex>
                                </div>,
                                <div>
                                    <Select options={optionsMoreLess}/>
                                </div>,
                                <div>
                                    <Select options={optionsE1E2}/>
                                    <Latex>{'$,Y$'}</Latex>
                                </div>,
                                <div>
                                    <Select options={optionsMoreLess}/>
                                    <Latex>{'$0}$'}</Latex>
                                </div>
                            ]
                        ]}
                                size={'small'} ariaLabel={"a dense table"}
                                head={
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={'center'} className={'table-head-cell'}>Составление
                                                ЗЛП</TableCell>
                                            <TableCell align={'center'} className={'table-head-cell'}>Задача
                                                А</TableCell>
                                            <TableCell align={'center'} className={'table-head-cell'}/>
                                            <TableCell align={'center'} className={'table-head-cell'}/>
                                            <TableCell align={'center'} className={'table-head-cell'}/>
                                            <TableCell align={'center'} className={'table-head-cell'}>Задача
                                                B</TableCell>
                                            <TableCell align={'center'} className={'table-head-cell'}/>
                                            <TableCell align={'center'} className={'table-head-cell'}/>
                                            <TableCell align={'center'} className={'table-head-cell'}/>
                                        </TableRow>
                                    </TableHead>
                                }
                        />

                    </div>
                </div>
            </div>


            <div id="task3">
                <p>Решения ЗЛП</p>

                // toDO: данная матрицв

                <p>Решения исходной задачи</p>

                // toDO: матрица с инпутами и v

            </div>
        </div>
    );
};

export default observer(Type8Matrix);