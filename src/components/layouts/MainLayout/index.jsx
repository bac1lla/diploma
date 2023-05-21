import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import classNames from "classnames/bind";
import {Outlet} from "react-router";
import Header from "../../../components/common/Header/index";
import {Context} from "../../../index";
import styles from './styles.css'
import {Steps} from 'rsuite';

const cx = classNames.bind(styles)

const MainLayout = () => {

    const {labs} = useContext(Context)

    return (
        <div className={cx('main-layout')}>
            <Header/>
            <div className={cx('content')}>
                <Outlet/>
            </div>
        </div>
    );
};

export default observer(MainLayout);