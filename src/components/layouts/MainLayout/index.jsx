import React from 'react';
import classNames from "classnames/bind";
import Header from "../../../components/common/Header/index";
import styles from './styles.css'

const cx = classNames.bind(styles)

const MainLayout = () => {
    return (
        <div className={cx('main-layout')}>
            <Header />
            <div className={cx('content')}>

            </div>
        </div>
    );
};

export default MainLayout;