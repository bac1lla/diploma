import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import {makeAutoObservable} from "mobx";
import {generateMatrix} from "../components/common/AppContainer";
import {postResult} from "../services/ApiService";
import {hash} from "./UserStore";

class LabsStore {
    constructor() {
        makeAutoObservable(this)
    }

    setLab(labName) {
        this._labName = labName;
        localStorage.setItem('labName', labName)
        localStorage.removeItem('results')
        this._results = [];
    }

    addResult(taskNum, result = 3) {
        if (this._results?.find(e => e?.i === taskNum)) {
            return
        }

        const results = [...this._results, {i: taskNum, result}];
        const stringResults = JSON.stringify(results);
        const encryptResults = CryptoJS.AES.encrypt(stringResults, hash).toString();
        localStorage.setItem('results', encryptResults)

        this.setResults(results)
    }

    setResults(results) {
        this._results = results;
    }

    _addResult(result) {
        const newResults = [...this._results, result]
        this.setResults(newResults)
    }

    getResults() {
        let bytes = CryptoJS.AES.decrypt(localStorage.getItem('results') || '', hash);
        let originalText = bytes?.toString(CryptoJS.enc.Utf8);

        try {
            let results = JSON.parse(originalText)
            return results?.slice().sort((a, b) => a?.i - b?.i)
        } catch (e) {
            return this._results?.slice().sort((a, b) => a?.i - b?.i);
        }
    }

    getLab() {

        return this._labName || localStorage.getItem('labName') || 'Лабораторная работа';
    }

    postResultsToBd({name, group, lab}) {
        let labName = lab
        if (!lab) {
            labName = 'matrix'
        }

        postResult({
            date: dayjs().format('DD.MM.YYYY'),
            name,
            group,
            pointsCount: this.getResults().reduce((acc, result) => acc + result?.result, 0),
            results: this.getResults().map(result => result?.result),
        }, labName).then(() => window.alert('Результаты отправлены')).catch(() => window.alert('Ошибка при отправке результатов'))
    }

    matrix(rows, columns) {
        let bytes = CryptoJS.AES.decrypt(localStorage.getItem('matrix') || '', hash);
        let originalText = bytes?.toString(CryptoJS.enc.Utf8);

        try {
            let matrix = JSON.parse(originalText)

            if (Array.isArray(matrix)) {
                return matrix
            }
        } catch (e) {
            let newMatrix = generateMatrix(rows, columns);

            const stringMatrix = JSON.stringify(newMatrix);
            const encryptMatrix = CryptoJS.AES.encrypt(stringMatrix, hash).toString();
            localStorage.setItem('matrix', encryptMatrix)

            return newMatrix
        }
    }

    _results = []
    _labName = ''
}


export default LabsStore