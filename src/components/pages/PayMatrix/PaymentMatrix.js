import classNames from "classnames/bind";
import {observer} from "mobx-react-lite";
import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {Context} from "../../../index";
import Matrix from "../../common/Matrix";
import styles from './styles.css'

function generateMatrix(rows, cols) {
    // Helper function to get the minimum value in an array
    const getMinValue = (arr) => Math.min(...arr);

    // Helper function to get the maximum value in an array
    const getMaxValue = (arr) => Math.max(...arr);

    // Helper function to generate a random integer between min and max (inclusive)
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Initialize the matrix
    const matrix = [];

    // Generate the matrix with random values
    for (let i = 0; i < rows; i++) {
        const row = [];

        // Generate random values for each element in the row
        for (let j = 0; j < cols; j++) {
            row.push(getRandomInt(1, 30));
        }

        matrix.push(row);
    }

    // Find the minimum value in each row
    const minValues = matrix.map((row) => getMinValue(row));

    // Find the maximum value among the minimum values
    const minMaxValue = getMaxValue(minValues);

    // Find the maximum value in each column
    const maxValues = Array.from({length: cols}, () => 0);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] > maxValues[j]) {
                maxValues[j] = matrix[i][j];
            }
        }
    }

    // Find the minimum value among the maximum values
    const maxMinValue = getMinValue(maxValues);

    return {
        matrix,
        minMaxValue,
        maxMinValue
    };
}

const cx = classNames.bind(styles)


const PaymentMatrix = ({rows, columns, goTo, step, next, needToPost}) => {
    const task = useMemo(() => generateMatrix(rows, columns), [rows, columns, step]);
    const {labs, user} = useContext(Context)
    const [minMaxInput, setMinMaxInput] = useState('');
    const [maxMinInput, setMaxMinInput] = useState('');
    const [minMaxError, setMinMaxError] = useState(false);
    const [maxMinError, setMaxMinError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [tries, setTries] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        setMaxMinInput('');
        setMinMaxInput('')
        setTries(3)
        setSuccess(false)
        setMinMaxError(false);
        setMaxMinError(false)
    }, [step])

    const postResultsToBD = () => {
        const {name, group} = user.getUser();
        labs.postResultsToBd({name, group, lab: 'paymentMatrix'})
    }

    const handlePostResults = () => {
        labs.addResult(step + 1, tries > 0 ? tries : 0)
        navigate('/matrix-test/' + goTo);
        next();
        if (needToPost) {
            postResultsToBD()
        }
    }

    const showAnswers = () => {
        setMaxMinInput(task.maxMinValue)
        setMinMaxInput(task.minMaxValue)
    }

    const handleCheck = () => {
        if (tries < 1) {
            setSuccess(true);
            showAnswers()
        }
        let error = false

        if (minMaxInput != task.minMaxValue) {
            setMinMaxError(true);
            error = true
        } else {
            setMinMaxError(false);
        }

        if (maxMinInput != task.maxMinValue) {
            setMaxMinError(true);
            error = true
        } else {
            setMaxMinError(false);
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
            padding: '0 5% 5% 5%',
            overflow: 'auto',
            margin: 'auto',
        }}>
            <div className={'payment-matrix-eplanation-task'}>
                <p>Найдите верхнюю и нижнюю цену игры данной плетежной матрицы</p>
                <div className={'payment-matrix-eplanation-input'}>
                    <Matrix style={{height: '100%'}} className={'paymaten-matrix-task'} matrix={task.matrix}
                            size={'small'}
                            ariaLabel={"a dense table"}/>
                    <div>

                        <Matrix style={{display: 'flex', alignItems: 'center'}} className={'paymaten-matrix-task'}
                                matrix={[['Нижняя цена игры', 'Верхняя цена игры'], [<input type="number"
                                                                                            value={minMaxInput}
                                                                                            className={cx('input-value-vector-3', {error: minMaxError})}
                                                                                            onChange={e => setMinMaxInput(e.target.value)}/>,
                                    <input type="number" value={maxMinInput}
                                           className={cx('input-value-vector-3', {error: maxMinError})}
                                           onChange={e => setMaxMinInput(e.target.value)}/>]]}
                        />
                        <div style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center',
                            marginTop: 20
                        }}>

                            {success ?
                                <Button variant='primary' style={{}} onClick={handlePostResults}>
                                    {needToPost ? 'Отправить результаты' : 'Далее'}
                                </Button> : <Button variant='primary' style={{}}
                                                    onClick={handleCheck}>
                                    {tries > 0 ? "Проверить" : "Показать ответы"}
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(PaymentMatrix);