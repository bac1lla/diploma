import {makeAutoObservable} from "mobx";
import {addStudent, getStudentById, getTeacher, signInStudent, signInTeacher} from "../services/ApiService";
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
        getStudentById(id)
            .then(student => {
                this.setUser(student)
                this.setAuth(true)
            })
            .catch(() => {
                this.setAuth(false)
            });
        this._isLoading = false
    }

    loginTeacher(email, password) {
        this._isLoading = true
        signInTeacher(email, password)
            .then(user => {
                if (!user?.email) {
                    this.setAuth(false)
                    return
                }
                const newUser = {...user, role: "TEACHER"}
                const stringUser = JSON.stringify(newUser)
                const encryptUser = CryptoJS.AES.encrypt(stringUser, hash).toString();
                localStorage.setItem('user', encryptUser)
                this.setUser(newUser)
                this.setAuth(true)
                this.setRole("TEACHER")
            })
            .catch(() => {
                this.setAuth(false)
            })
        this._isLoading = false
    }

    loginStudent(id) {
        this._isLoading = true
        signInStudent()
            .then(() => {
                getStudentById(id)
                    .then(user => {
                        const newUser = {...user, id}
                        const stringUser = JSON.stringify(newUser)
                        const encryptUser = CryptoJS.AES.encrypt(stringUser, hash).toString();
                        localStorage.setItem('user', encryptUser)
                        this.setUser(newUser)
                        this.setRole('STUDENT')
                        this.setAuth(true)
                    })
                    .catch((error) => {
                        this.setAuth(false)
                    })
            })
            .catch(() => {
                this.setAuth(false)
            })
        this._isLoading = false
    }

    regStudent(name, group) {
        this._isLoading = true
        addStudent({name, group})
            .then(() => {
                this.setUser({name, group, role: "STUDENT"})
                this.setRole("STUDENT")
                this.setAuth(true)
            })
            .catch(() => {
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
            this.setRole(user?.role ? user.role : 'STUDENT');
            this.setUser(user)
            this.setAuth(true)
        } catch (e) {
            this.setAuth(false)
        }

        return this._isAuth
    }

    isTeacher() {
        let bytes = CryptoJS.AES.decrypt(localStorage.getItem('user') || '', hash);
        let originalText = bytes?.toString(CryptoJS.enc.Utf8);

        try {
            let user = JSON.parse(originalText)
            this.setRole(user?.role ? user.role : 'STUDENT');
        } catch (e) {
            this.setAuth(false)
        }

        return this._role === "TEACHER"
    }

    setRole(role) {
        this._role = role;
    }

    logout() {
        localStorage.clear()
        this.setAuth(false)
        this.setRole("STUDENT")
    }

    isLoading() {
        return this._isLoading
    }

    _user = {
        name: "",
        group: "",
        role: "",
    };
    _role = "STUDENT"
    _isAuth = false;
    _isLoading = false
}

export default UserStore;