import classNames from "classnames/bind";
import React, {memo} from 'react';
import styles from './styles.css'

const cx = classNames.bind(styles)

const buttonColors = {
    primary: 'primary',
    danger: 'danger',
    action: 'action',
}

const Button = ({className, onClick, text, disabled, styleBtn}) => {
    return (
        <button className={cx('default-button', className, styleBtn)} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

Button.styleBtn = buttonColors;

export default memo(Button);