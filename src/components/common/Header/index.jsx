import React, {memo} from 'react';
import styles from './styles.css'
import classNames from "classnames/bind";
import Logo from "../Logo";
import Text from "../Text";
const cx = classNames.bind(styles)

const Header = () => {
    return (
        <div className={cx('header')}>
            <Logo className={cx('logo')}/>
            <Text text={'LAB_NAME'} className={cx('lab-name')} />
            <div className={cx('person-group')}>
                <div className={cx('vertical-divide')} />
                <Text text={"Name"} className={cx("person-name")} />
                <Text text={"group"} className={cx("person-group")} />
            </div>

        </div>
    );
};

export default memo(Header);