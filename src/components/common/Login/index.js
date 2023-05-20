import classNames from "classnames/bind";
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {InputGroup} from "react-bootstrap";
import {generatePath, useLocation, useParams,} from "react-router";
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {
    ROUTE__LOGIN, ROUTE__REGISTRATION,
} from "../../../constants/routes";
import {addStudent, getAllStudents} from "../../../services/ApiService";
import Button from "../Button";
import Text from "../Text";
import styles from './styles.css'

const cx = classNames.bind(styles)

const profiles = {
    student: "student",
    teacher: "teacher",
}

const createOptions = students => students?.map(student => ({value: student?.name + student?.group, label: <span className={cx('login-user-option')}><Text text={student?.name} /><Text text={student?.group} /></span>}));

const Login = () => {
    const params = useParams();
    const location = useLocation();
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState('')
    const [studentGroup, setStudentGroup] = useState('')


    const isStudent = params.profile === profiles.student
    const isLogin = location.pathname.includes('login');

    const buttonRegistrationStudentText = useMemo(() => isLogin ? "Зарегестрировать профиль студента" : "Войти в профиль студента", [isLogin])
    const buttonRegistrationTeacherText = useMemo(() => isStudent ? "Я учитель" : "Я студент", [isStudent]);

    const formRoute = isLogin ? ROUTE__LOGIN : ROUTE__REGISTRATION;
    const oppositeFormRoute = isLogin ? ROUTE__REGISTRATION : ROUTE__LOGIN;
    const oppositeProfileRoute = isStudent ? profiles.teacher : profiles.student;

    const handleCLick = useCallback(() => {

        if (isLogin) {
            return;
        }

        addStudent({name: studentName, group: studentGroup})
    }, [isLogin, studentGroup, studentName]);

    useEffect(() => {
        getAllStudents().then(data => setStudents(data))
    }, [isLogin])

    return (
        <div className={cx('login-wrapper')}>
            <div className={cx('login-text-group')}>
                <Text text={'Лабораторная работа №1'} className={cx('login-header-text')}/>
                <Text text={'Векторная оптимизация'} className={cx('login-lab-name-text')}/>
            </div>
            <div className={cx('login-main-group')}>
                {isLogin && <>
                    <Select options={createOptions(students)} className={cx('login-user-select')}/>
                </>}
                {!isLogin && <>
                    <InputGroup size="sm" className="mb-3 login-user-select">
                        <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                        <Form.Control
                            aria-label="small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={e => setStudentName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3 login-user-select">
                        <InputGroup.Text id="inputGroup-sizing-sm">Group</InputGroup.Text>
                        <Form.Control
                            aria-label="small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={e => setStudentGroup(e.target.value)}
                        />
                    </InputGroup>
                </>}
                    <Button onClick={handleCLick} text={isLogin ? 'Войти' : "Зарегистрироваться"} styleBtn={'primary'}/>
            </div>
            <div className={cx('login-button-group')}>
                <Link to={generatePath(oppositeFormRoute, {profile: params.profile || profiles.student})}>
                    <Text text={buttonRegistrationStudentText} />
                </Link>
                <Link to={generatePath(formRoute, {profile: oppositeProfileRoute})}>
                    <Text text={buttonRegistrationTeacherText} />
                </Link>
            </div>
        </div>
    );
};

export default memo(Login);