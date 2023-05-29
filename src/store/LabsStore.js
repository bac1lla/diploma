import CryptoJS from "crypto-js";
import {makeAutoObservable} from "mobx";
import {hash} from "./UserStore";

class LabsStore {
    constructor() {
        makeAutoObservable(this)
    }

    setLab(labName) {
        this._labName = labName;
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

        this._results.push({
            i: taskNum,
            result
        });
    }

    setResults(results) {
        this._results = results;
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
        return this._labName;
    }

    _results = []
    _labName = ''
}


export default LabsStore