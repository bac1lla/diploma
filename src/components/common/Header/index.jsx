import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import Select from "react-select";
import {ROUTE__SELECT_LAB, ROUTE__TEACHER_PROFILE} from "../../../constants/routes";
import {Context} from "../../../index";
import styles from './styles.css'
import classNames from "classnames/bind";
import Logo from "../Logo";
import Text from "../Text";

const cx = classNames.bind(styles)


const Header = () => {
    const {user, labs} = useContext(Context)
    const navigate = useNavigate();

    const options = [
        {
            value: user.getUser()?.name,
            label: <>
                <Text text={user.getUser()?.name?.split(" ")?.[0] || 'Студент'} className={cx("person-name")}/>
            </>
        },
        {
            value: "Выйти",
            label: <Text text={'Выйти'}/>,
        }
    ]

    const handleCLick = (option) => {
        if (option.value === "Выйти") {
            user.logout()
        }
    }

    const logout = () => {
        user.logout()
    }

    if (user.isTeacher()) {
        return (
            <div className={cx('header')}>
                <Logo className={cx('logo')} onClick={() => navigate(ROUTE__TEACHER_PROFILE)}/>
                <div className={cx('person-group')}>
                    <div className={cx('vertical-divide')}/>
                    <Button onClick={logout}>
                        <Text text={'Выйти'} className={cx("teacher-group")}/>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={cx('header')}>
            <Logo className={cx('logo')} onClick={() => navigate(ROUTE__SELECT_LAB)}/>
            <Text text={labs.getLab()} className={cx('lab-name')}/>
            <div className={cx('person-group')}>
                <div className={cx('vertical-divide')}/>
                <Select onChange={handleCLick} options={options} value={options[0]} className={cx('header-select')}/>
                <Text text={user.getUser()?.group} className={cx("person-group")}/>
            </div>
        </div>
    );
};

export default observer(Header);