import {observer} from "mobx-react-lite";
import React, {useCallback, useContext} from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import Select from "react-select";
import {
    ROUTE__MATRIX_LAB__TEACHER, ROUTE__MATRIX_LABS, ROUTE__MATRIX_TEST,
    ROUTE__SELECT_LAB,
    ROUTE__VECTOR_LAB
} from "../../../constants/routes";
import {Context} from "../../../index";
import styles from './styles.css'
import classNames from "classnames/bind";
import Logo from "../logo.svg"
import Text from "../Text";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const cx = classNames.bind(styles)

const Header = ({setModal, setVector, setMatrix, setPayment}) => {
    const {user, labs} = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation();
    const isMatrix = location.pathname.includes(ROUTE__MATRIX_LAB__TEACHER)

    const options = [
        {
            value: user.getUser()?.name,
            label: <>
                <Text text={user.getUser()?.name?.split(" ")?.[0] || 'Студент'} className={cx("person-name")}/>
            </>
        },
        {
            value: "Выйти",
            label: <Text text={'Выйти'}/>,
        }
    ]

    const handleSetMatrixModalOpen = useCallback(() => {
        setModal(true)
    }, [])

    const handleCLick = (option) => {
        if (option.value === "Выйти") {
            navigate('/')
            user.logout()
        }
    }

    const openTheory = () => {
        const exactLocation = location.pathname.includes('vector') ? ROUTE__VECTOR_LAB : location.pathname.includes('test') ? ROUTE__MATRIX_TEST : ROUTE__MATRIX_LABS

        if (exactLocation === ROUTE__VECTOR_LAB) {
            setVector(true)
        }

        if (exactLocation === ROUTE__MATRIX_TEST) {
            setPayment(true)
        }

        if (exactLocation === ROUTE__MATRIX_LABS) {
            setMatrix(true)
        }
    }

    const logout = () => {
        navigate('/')
        user.logout()
    }

    if (user.isTeacher()) {
        return (
            <div className={cx('header')}>
                {/*<Logo className={cx('logosvg')} onClick={() => navigate(ROUTE__TEACHER_PROFILE)}/>*/}
                <img src={Logo} className={cx('logo.svg')} onClick={() => navigate(ROUTE__SELECT_LAB)}/>
                <div className={cx('person-group')}>
                    <div className={cx('vertical-divide')}/>
                    <Button onClick={logout}>
                        <Text text={'Выйти'} className={cx("teacher-group")}/>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={cx('header')}>
            <img src={Logo} className={cx('logo.svg')} onClick={() => {
                navigate(ROUTE__SELECT_LAB)
            }}/>
            {/*<Logo className={cx('logo.svg')} onClick={() => navigate(ROUTE__SELECT_LAB)}/>*/}
            <Text text={labs.getLab()} className={cx('lab-name')}/>
            <div className={cx('person-group')}>
                {isMatrix && <Button onClick={handleSetMatrixModalOpen}>Посмотреть задание</Button>}
                {!isMatrix && <HelpCenterIcon onClick={openTheory}/>}
                <div className={cx('vertical-divide')}/>
                <Select onChange={handleCLick} options={options} value={options[0]} className={cx('header-select')}/>
                <Text text={user.getUser()?.group} className={cx("person-group")}/>
            </div>
        </div>
    );
};

export default observer(Header);