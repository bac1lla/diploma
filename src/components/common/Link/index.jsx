import React, {memo} from 'react';
import classNames from "classnames/bind";
import styles from './styles.css'

const cx = classNames.bind(styles)
const Link = ({text, className}) => {
    return (
        <span className={cx('link', className)}>
            {text}
        </span>
    );
};

export default memo(Link);