import classNames from "classnames/bind";
import React, {memo} from 'react';
import {Md3P} from "react-icons/md";
import styles from './styles.css'

const cx = classNames.bind(styles)

const Logo = ({className, onClick}) => {
    return (
        <Md3P className={cx('logo.svg', className)} onClick={onClick}/>
    );
};

export default memo(Logo);