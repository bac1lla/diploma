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
                description: "Для критериев g1(x), g2(x) и g3(x), найдите области эффективных векторных оценок на множестве X={x1, x2, x3}, для всех предложенных задач"
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
        localStorage.setItem('labName', labName)
        this._labName = labName;
    }

    getLab() {
        return this._labName;
    }


    _labName = ''
    _tasksCount = ''
}


export default LabsStore