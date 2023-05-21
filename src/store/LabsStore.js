import {makeAutoObservable} from "mobx";

const data = {
    matrix: {
        tasksCount: 8,
        tasks: [
            {}
        ]
    },
    vector: {
        tasksCount: 5,
        tasks: [
            {
                description: "Для функции g1(x) и g2(x), заданной графически, найдите области эффективных векторных оценок на интервале [a, b], для всех предложенных задач.\n Для этого:\n 1) Расставьте точки - границы интервалов множества эффективных векторных оценок и отдельные их точки.\n 2) Укажите области эффективных оценки векторных оценок, введя их с клавиатуры в соответствующие поля\n",

            },
            {
                description: "Для критериев g1(x), g2(x) и g3(x), найдите области эффективных векторных оценок на множестве X={x1, x2, x3}, для всех предложенных задач",
                variants: {
                    small: [
                        {
                            matrix: [['', 'x1', 'x2', 'x3'], ['g1', 3, 1, 0], ['g2', 2, 3, 0], ['g3', 2, 0, 2]],
                        }
                    ],
                    big: [
                        {
                            matrix: [['', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
                                ['g1', 1, 3, 5, 3, 5, 0, 2],
                                ['g2', 2, 0, 1, 5, 5, 0, 2],
                                ['g3', 4, 2, 0, 2, 5, 0, 3]],
                        }
                    ],
                }
            },
            {
                description: "Для критериев g1(x), g2(x) и g3(x), найдите области эффективных векторных оценок на множестве X={x1, x2, x3}, для всех предложенных задач"
            }
        ]
    }
}

class LabsStore {
    constructor() {
        makeAutoObservable(this)
    }

    setLab(labName) {
        localStorage.setItem('labName', labName);
        this._labName = labName;
        this._results = [];
    }

    addResult(taskName, result = 3) {
        this._results.push({taskName, result});
    }

    getResults() {
        return this._results;
    }

    getLab() {
        return this._labName;
    }

    _results = []
    _labName = ''
    _tasksCount = ''
}


export default LabsStore