import {observer} from "mobx-react-lite";
import React, {memo, useContext} from 'react';
import {Context} from "../../../index";
import styles from './styles.css'
import classNames from "classnames/bind";
import Logo from "../Logo";
import Text from "../Text";

const cx = classNames.bind(styles)

const Header = () => {
    const {user, labs} = useContext(Context)

    return (
        <div className={cx('header')}>
            <Logo className={cx('logo')}/>
            <Text text={labs.getLab()} className={cx('lab-name')}/>
            <div className={cx('person-group')}>
                <div className={cx('vertical-divide')}/>
                <Text text={user.getUser()?.name?.split(" ")?.[0]} className={cx("person-name")}/>
                <Text text={user.getUser()?.group} className={cx("person-group")}/>
            </div>

        </div>
    );
};

export default observer(Header);