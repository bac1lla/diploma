import React, {memo} from 'react';
import classNames from "classnames/bind";
import styles from './styles.css'

const cx = classNames.bind(styles)
const Text = ({text, className}) => {
    return (
        <span className={cx('text', className)}>
            {text}
        </span>
    );
};

export default memo(Text);