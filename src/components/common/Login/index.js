import classNames from "classnames/bind";
import {observer} from "mobx-react-lite";
import React, {memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {InputGroup} from "react-bootstrap";
import {generatePath, useLocation, useNavigate, useParams,} from "react-router";
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"
import Select from "react-select";
import {
    ROUTE__LOGIN, ROUTE__REGISTRATION, ROUTE__SELECT_LAB,
} from "../../../constants/routes";
import {Context} from "../../../index";
import {addStudent, getAllStudents, getStudentById, signInStudent, signInTeacher} from "../../../services/ApiService";
import Button from "../Button";
import Text from "../Text";
import styles from './styles.css'

const cx = classNames.bind(styles)

const profiles = {
    student: "student",
    teacher: "teacher",
}

const createOptions = students => students?.map(student => ({value: student?.id, label: student?.name}));

const Login = () => {
    const params = useParams();
    const location = useLocation();
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState('')
    const [studentGroup, setStudentGroup] = useState('')
    const [teacherEmail, setTeacherEmail] = useState('')
    const [teacherPassword, setTeacherPassword] = useState('')
    const {user} = useContext(Context);
    const navigate = useNavigate()


    const isStudent = params.profile === profiles.student
    const isLogin = location.pathname.includes('login');

    const buttonRegistrationStudentText = useMemo(() => isLogin ? "Зарегестрировать профиль студента" : "Войти в профиль студента", [isLogin])
    const buttonRegistrationTeacherText = useMemo(() => isStudent ? "Я учитель" : "Я студент", [isStudent]);

    const formRoute = isLogin ? ROUTE__LOGIN : ROUTE__REGISTRATION;
    const oppositeFormRoute = isLogin ? ROUTE__REGISTRATION : ROUTE__LOGIN;
    const oppositeProfileRoute = isStudent ? profiles.teacher : profiles.student;

    const handleCLick = (id) => {

        if (!isStudent) {
            user.loginTeacher(teacherEmail, teacherPassword)
            return;
        }

        if (isLogin && isStudent) {
            user.loginStudent(id)
            navigate(ROUTE__SELECT_LAB);
            return;
        }


        if (!isLogin && isStudent) {
            user.regStudent(studentName, studentGroup)
            navigate(ROUTE__SELECT_LAB);
        }
    };

    useEffect(() => {
        getAllStudents().then(data => setStudents(data))
    }, [isLogin])

    return (
        <div className={cx('login-wrapper')}>
            <div className={cx('login-text-group')}>
                <Text text={'<ДИЦИПЛИНА>'} className={cx('login-header-text')}/>
                <Text text={'Лабораторная работа'} className={cx('login-header-text')}/>
            </div>
            <div className={cx('login-main-group')}>
                {isLogin && isStudent && <>
                    <Select options={createOptions(students)} className={cx('login-user-select')}
                            onChange={option => handleCLick(option.value)}/>
                </>}
                {!isLogin && isStudent && <>
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
                {!isStudent && <>
                    <InputGroup size="sm" className="mb-3 login-user-select">
                        <InputGroup.Text id="inputGroup-sizing-sm">email</InputGroup.Text>
                        <Form.Control
                            aria-label="small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={e => setTeacherEmail(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3 login-user-select">
                        <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
                        <Form.Control
                            aria-label="small"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={e => setTeacherPassword(e.target.value)}
                        />
                    </InputGroup>
                </>}

                <Button onClick={handleCLick} text={isLogin || !isStudent ? 'Войти' : "Зарегистрироваться"}
                        styleBtn={'primary'}/>
            </div>
            <div className={cx('login-button-group')}>
                <Link to={generatePath(oppositeFormRoute, {profile: profiles.student})}>
                    <Text text={buttonRegistrationStudentText}/>
                </Link>
                <Link to={generatePath(formRoute, {profile: oppositeProfileRoute})}>
                    <Text text={buttonRegistrationTeacherText}/>
                </Link>
            </div>
        </div>
    );
};

export default observer(Login);