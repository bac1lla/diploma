import {makeAutoObservable} from "mobx";
import {addStudent, getStudentById, signInStudent, signInTeacher} from "../services/ApiService";
import CryptoJS from 'crypto-js'

export const hash = 'secret'


class UserStore {
    constructor() {
        makeAutoObservable(this);
    }

    getUser() {
        return this._user;
    }

    login(id) {
        this._isLoading = true
        getStudentById(id).then(student => this.setUser(student))
        this._isLoading = false
    }

    loginTeacher(email, password) {
        this._isLoading = true
        signInTeacher(email, password)
            .then(() => {
                this.setAuth(true)
            })
            .catch(() => {
                console.log('error')
                this.setAuth(false)
            })
        this._isLoading = false
    }

    loginStudent(id) {
        this._isLoading = true
        signInStudent()
            .then(() => {
                console.log(id)
                getStudentById(id)
                    .then(user => {
                        const newUser = {...user, id}
                        const stringUser = JSON.stringify(newUser)
                        const encryptUser = CryptoJS.AES.encrypt(stringUser, hash).toString();
                        localStorage.setItem('user', encryptUser)
                        this.setUser(newUser)
                        this.setAuth(true)
                    })
                    .catch((error) => {
                        console.log(error)
                        this.setAuth(false)
                    })
            })
            .catch(() => {
                console.log('error')
                this.setAuth(false)
            })
        this._isLoading = false
    }

    regStudent(name, group) {
        this._isLoading = true
        addStudent({name, group})
            .then(() => {
                this.setUser({name, group, role: "STUDENT"})
                this.setAuth(true)
            })
            .catch(() => {
                console.log('error')
                this.setAuth(false)
            })
        this._isLoading = false
    }

    setUser(user) {
        this._user = user;
    }

    setAuth(bool) {
        this._isAuth = bool;
    }

    isAuth() {
        let bytes = CryptoJS.AES.decrypt(localStorage.getItem('user') || '', hash);
        let originalText = bytes?.toString(CryptoJS.enc.Utf8);

        try {
            let user = JSON.parse(originalText)
            this.setUser(user)
            this._isAuth = true
        } catch (e) {
            this._isAuth = false
        }

        return this._isAuth
    }

    isLoading() {
        return this._isLoading
    }

    _user = {
        name: "",
        group: "",
        role: "",
    };
    _isAuth = false;
    _isLoading = false
}

export default UserStore;