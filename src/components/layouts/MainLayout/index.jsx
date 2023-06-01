import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import classNames from "classnames/bind";
import {Outlet, useLocation} from "react-router";
import Header from "../../../components/common/Header/index";
import {ROUTE__MATRIX_LAB__TEACHER} from "../../../constants/routes";
import {Context} from "../../../index";
import styles from './styles.css'

const cx = classNames.bind(styles)

const MainLayout = ({setModal, setVector, setMatrix, setPayment}) => {
    const {labs} = useContext(Context)


    return (
        <div className={cx('main-layout')}>
            <Header setModal={setModal} setVector={setVector} setMatrix={setMatrix} setPayment={setPayment}/>
            <div className={cx('content')}>
                <Outlet/>
            </div>
        </div>
    );
};

export default observer(MainLayout);