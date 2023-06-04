import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {uniqueId} from "lodash";
import {
    ROUTE__MATRIX_LAB__TEACHER,
    ROUTE__PAYMENT_MATRIX_LAB__TEACHER,
    ROUTE__VECTOR_LAB__TEACHER
} from "../../../constants/routes";
import {Context} from "../../../index";
import {getAllResults, changeRange, getBDRange, postResult} from "../../../services/ApiService";
import ChangeRange from "../../common/ChangeRange";
import styles from './styles.css'
import classNames from "classnames/bind";
import {Button, Modal} from "react-bootstrap";
import Text from "../../common/Text";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const cx = classNames.bind(styles)


const TeacherProfile = () => {
    const {labs} = useContext(Context)
    const location = useLocation()
    const isVector = location.pathname.includes(ROUTE__VECTOR_LAB__TEACHER)
    const isPaymentMatrix = location.pathname.includes(ROUTE__PAYMENT_MATRIX_LAB__TEACHER);
    const navigate = useNavigate();
    const [isOpenModal, setIsOpen] = useState(false);
    const [isOpenResults, setIsOpenResults] = useState(false);
    const [results, setResults] = useState([])
    const [search, setSearch] = useState('')
    const [date, setDate] = useState(dayjs(Date.now()))
    const [isDateDisabled, setDisableDate] = useState(true)
    const [range, setRange] = useState({minValue: 0, maxValue: 0, minRange3: 1, minRange4: 1, minRange5: 1})
    const [student, setStudent] = useState({});
    const [sort, setSort] = useState(false)

    const handleGoMatrix = () => {
        navigate(ROUTE__MATRIX_LAB__TEACHER)
    }

    const handleGoVector = () => {
        navigate(ROUTE__VECTOR_LAB__TEACHER)
    }

    const handleGoMatrixPayment = () => {
        navigate(ROUTE__PAYMENT_MATRIX_LAB__TEACHER)
    }

    const handleOpenModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const getResults = () => {
        const labName = isVector ? 'vector' : isPaymentMatrix ? 'paymentMatrix' : 'matrix';
        getAllResults(labName)
            .then(results => {
                labs.setResults(results)
                setResults(results)
            })
            .catch(() => {
                console.log('error')
            })
    }

    const filterResults = useCallback(e => {
        setSearch(e.target.value);
    }, [])

    const getRange = () => {
        const labName = isVector ? 'vector' : isPaymentMatrix ? 'paymentMatrix' : 'matrix';
        getBDRange(labName)
            .then(range => {
                setRange(range)
            })
            .catch(() => {
                console.log('error')
            })
    }

    useEffect(() => {
        getResults();
        getRange()
    }, [location.pathname])

    const clearDate = useCallback(() => {
        setDisableDate(prev => !prev)
    }, [])

    let data = search || !isDateDisabled ? results.filter(result => {
        if (search && date) {
            return result?.name.toLowerCase().includes(search.toLowerCase())
                || result?.group.toLowerCase().includes(search.toLowerCase())
                || (result?.pointsCount + '').includes(search.toLowerCase())
                || (result?.grade + '').includes(search.toLowerCase())
                || result.date.includes(date)
        }

        if (search) {
            return result?.name.toLowerCase().includes(search.toLowerCase())
                || result?.group.toLowerCase().includes(search.toLowerCase())
                || (result?.pointsCount + '').includes(search.toLowerCase())
                || (result?.grade + '').includes(search.toLowerCase())
        }

        return result.date.includes(date.format('DD.MM.YYYY'))
    }) : results

    const handleSortByName = () => {
        setSort(prev => !prev)
        if (sort) {
            data = results.sort((a, b) => a?.name > b?.name ? 1 : -1)
        } else {
            data = results.sort((a, b) => a?.name > b?.name ? -1 : 1)
        }
    }

    const handleSortByGroup = () => {
        setSort(prev => !prev)
        if (sort) {
            data = results.sort((a, b) => a?.group > b?.group ? 1 : -1)
        } else {
            data = results.sort((a, b) => a?.group > b?.group ? -1 : 1)
        }
    }

    const handleSortByPoints = () => {
        setSort(prev => !prev)
        if (sort) {
            data = results.sort((a, b) => a?.pointsCount - b?.pointsCount)
        } else {
            data = results.sort((a, b) => b?.pointsCount - a?.pointsCount)
        }
        console.log(data)
    }

    const handleSaveRange = useCallback((range) => {
        const labName = isVector ? 'vector' : isPaymentMatrix ? 'paymentMatrix' : 'matrix';
        setRange(range)
        changeRange(range, labName)
            .then(() => {
                getRange()
            })
            .catch(() => {
                console.log('error')
            })
        handleCloseModal()
    }, [isVector, range])

    const modifyResult = useCallback((points) => {
        if (+points >= +range.minRange5) {
            return 5
        }
        if (+points >= +range.minRange4) {
            return 4
        }
        if (+points >= +range.minRange3) {
            return 3
        }

        return 2
    }, [range])

    const openResultsDescription = result => {
        setStudent(result)
        setIsOpenResults(true)
    }

    const handleCloseModalResults = useCallback(() => {
        setIsOpenResults(false)
    }, [])

    return (
        <div className={cx('teacher-wrapper')}>
            <div className={cx('teacher-side')}>
                <Button className={cx('teacher-side-item', {teacherSideItemActive: !isVector && !isPaymentMatrix})}
                        onClick={handleGoMatrix}>
                    <Text text={'Матричные игры'} className={cx('teacher-side-item-text')}/>
                </Button>
                <Button className={cx('teacher-side-item', {teacherSideItemActive: isVector})}
                        onClick={handleGoVector}>
                    <Text text={'Задачи векторной оптимизации'} className={cx('teacher-side-item-text')}/>
                </Button>
                {/*<Button className={cx('teacher-side-item', {teacherSideItemActive: isPaymentMatrix})}*/}
                {/*        onClick={handleGoMatrixPayment}>*/}
                {/*    <Text text={'Платежные матрциы'} className={cx('teacher-side-item-text')}/>*/}
                {/*</Button>*/}
                <div className={'teacher-side-column'}>
                    <div className={'change-range-row'}>
                        <Text text={'5'} className={'change-range-number'}/>
                        <Text text={+range.minRange5} className={'change-range-field'}/>
                        <Text text={"-"} className={'change-range-sep'}/>
                        <Text text={+range.maxValue} className={'change-range-field'}/>
                    </div>
                    <div className={'change-range-row'}>
                        <Text text={'4'} className={'change-range-number'}/>
                        <Text text={+range.minRange4} className={'change-range-field'}/>
                        <Text text={"-"} className={'change-range-sep'}/>
                        <Text text={+range.minRange5 - 1} className={'change-range-field'}/>
                    </div>
                    <div className={'change-range-row'}>
                        <Text text={'3'} className={'change-range-number'}/>
                        <Text text={+range.minRange3} className={'change-range-field'}/>
                        <Text text={"-"} className={'change-range-sep'}/>
                        <Text text={+range.minRange4 - 1} className={'change-range-field'}/>
                    </div>
                    <div className={'change-range-row'}>
                        <Text text={'2'} className={'change-range-number'}/>
                        <Text text={+range.minValue} className={'change-range-field'}/>
                        <Text text={"-"} className={'change-range-sep'}/>
                        <Text text={+range.minRange3 - 1} className={'change-range-field'}/>
                    </div>
                </div>
            </div>
            <div className={cx('teacher-table')}>
                <div className={cx('teacher-header')}>
                    <input placeholder={'Введите ФИО или группу'} className={cx('teacher-search')} value={search}
                           onChange={filterResults}/>
                    <span style={{display: 'flex', alignItems: 'center', gap: 5, width: "20%"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className={cx('teacher-date')} format="DD.MM.YYYY"
                                        value={date} onChange={setDate} disabled={isDateDisabled}
                            />
                        </LocalizationProvider>
                        {isDateDisabled ? <DoneIcon onClick={clearDate}/> : <CloseIcon onClick={clearDate}/>}
                    </span>
                    <Button onClick={handleOpenModal}>Изменить критерии оценки</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" onClick={handleSortByName}
                                           className={'teacher-head-row-cell'}>ФИО</TableCell>
                                <TableCell align="center" onClick={handleSortByGroup}
                                           className={'teacher-head-row-cell'}>Группа</TableCell>
                                <TableCell align="center" onClick={handleSortByPoints}
                                           className={'teacher-head-row-cell'}>Баллы</TableCell>
                                <TableCell align="center" onClick={handleSortByPoints}
                                           className={'teacher-head-row-cell'}>Оценка</TableCell>
                                <TableCell align="center"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((result, i) => (
                                <TableRow
                                    key={uniqueId()}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell className={'teacher-table-cell'} align="left"
                                               key={uniqueId()}>{result?.name}</TableCell>
                                    <TableCell className={'teacher-table-cell'} align="center"
                                               key={uniqueId()}>{result?.group}</TableCell>
                                    <TableCell className={'teacher-table-cell'} align="center"
                                               key={uniqueId()}>{result?.pointsCount}</TableCell>
                                    <TableCell className={'teacher-table-cell'} align="center"
                                               key={uniqueId()}>{modifyResult(result?.pointsCount)}</TableCell>
                                    <TableCell className={'teacher-table-cell'} align="center"
                                               key={uniqueId()}>
                                        <Button variant={'outline'}
                                                onClick={() => openResultsDescription(result)}>Подробнее</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal show={isOpenModal} onHide={handleCloseModal} className={cx('teacher-modal')}>
                <ChangeRange onClose={handleCloseModal} onSave={handleSaveRange} range={range}/>
            </Modal>
            <Modal show={isOpenResults} onHide={handleCloseModalResults}>
                <div className={'teacher-show-results'}>
                    <h3>{student?.name}</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Задание</TableCell>
                                    <TableCell align="center">Результат</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                student?.results?.map((result, i) => <TableRow>
                                    <TableCell>Задание {i + 1}</TableCell>
                                    <TableCell>{result}/3</TableCell>
                                </TableRow>)
                            }
                        </Table>
                    </TableContainer>
                    <h3>Результат: {student?.pointsCount}</h3>
                    <h3>Оценка: {modifyResult(student?.pointsCount)}</h3>
                </div>
            </Modal>
        </div>
    );
};

export default observer(TeacherProfile);
