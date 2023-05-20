import classNames from "classnames/bind";
import React, {memo} from 'react';
import {Md3P} from "react-icons/md";
import styles from './styles.css'

const cx = classNames.bind(styles)

const Logo = ({className}) => {
    return (
        <Md3P className={cx('logo', className)}/>
    );
};

export default memo(Logo);