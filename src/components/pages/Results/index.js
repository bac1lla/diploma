import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {useLocation} from "react-router";
import {ROUTE__PAYMENT_MATRIX_LAB__TEACHER, ROUTE__VECTOR_LAB__TEACHER} from "../../../constants/routes";
import {Context} from "../../../index";
import {getBDRange} from "../../../services/ApiService";
import Matrix from "../../common/Matrix";
import Text from "../../common/Text";
import './styles.css'

const Results = ({tasksNames, api}) => {
    const {labs, user} = useContext(Context);
    const location = useLocation();
    const isPaymentMatrix = location.pathname.includes('test');
    const isVector = location.pathname.includes(ROUTE__VECTOR_LAB__TEACHER)
    const [range, setRange] = useState({minValue: 0, maxValue: 0, minRange3: 1, minRange4: 1, minRange5: 1})

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

    const [grade, setGrade] = useState(modifyResult(labs.getResults()?.reduce((acc, item) => acc + item?.result || 0, 0)));

    const getRange = () => {
        const labName = isVector ? 'vector' : isPaymentMatrix ? 'paymentMatrix' : 'matrix';
        getBDRange(labName)
            .then(range => {
                setRange(range)
            })
            .catch(() => {
            })
    }

    useEffect(() => {
        getRange();
    }, [isVector])

    const postResults = () => {
        const alreadyPast = localStorage.getItem("duyn39*&N#mdp>)I_#H G@#BLDS_@#((ND&&D%%#@")
        if (alreadyPast === 'sdif89br384sdgf77839ds8yf9(MYF&DST)NMW<_U_*MY$#*NYX<_<FJ<SBIDF') {
            api()
            localStorage.setItem('duyn39*&N#mdp>)I_#H G@#BLDS_@#((ND&&D%%#@', 'fwhnum03983-28,74-x89t.y342t78n23by4xinuhm9x2ny9rmymYN*TYETM')
        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "flex-start",
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0 5% 5% 5%',
            overflow: 'auto',
            margin: 'auto',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: "flex-start",
                padding: 50,
                borderRadius: 20,
                margin: 'auto',
                backgroundColor: 'white',
            }}>
                <h2 style={{marginBottom: 10}}>Результаты</h2>
                <div style={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    // flexDirection: 'column',
                    height: "100%",
                    gap: 50,
                }}>
                    <Matrix className={'results-table-student'}
                            style={{width: '100%'}}
                            matrix={labs.getResults()?.map(e => [<span>Задание {e?.i}</span>,
                                <span>{3 - e?.result}</span>,
                                <span>{e?.result}/3   </span>])}
                            cellClassName={'table-cell'}
                            head={<TableHead>
                                <TableRow>
                                    <TableCell align={'center'} className={'table-head-cell'}>Задание</TableCell>
                                    <TableCell align={'center'} className={'table-head-cell'}>Допущенные
                                        ошибки</TableCell>
                                    <TableCell align={'center'} className={'table-head-cell'}>Количество
                                        баллов</TableCell>
                                </TableRow>
                            </TableHead>}
                        // firstColumn={tasksNames}
                    >
                    </Matrix>
                    <div style={{
                        display: 'flex',
                        alignItems: "center",
                        // justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <Matrix
                            className={'results-range-page-table'}
                            style={{}}
                            size={'small'} ariaLabel={"a dense table"}
                            matrix={[
                                [<Text text={'5'} className={'change-range-number change-range-number-5'}/>,
                                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text
                                        text={+range.minRange5}
                                        className={'change-range-field'}/>
                                        <Text text={"-"} className={'change-range-sep'}/>
                                        <Text text={+range.maxValue} className={'change-range-field'}/></div>],
                                [
                                    <Text text={'4'} className={'change-range-number change-range-number-4'}/>,
                                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text
                                        text={+range.minRange4}
                                        className={'change-range-field'}/>
                                        <Text text={"-"} className={'change-range-sep'}/>
                                        <Text text={+range.minRange5 - 1} className={'change-range-field'}/>
                                    </div>],
                                [
                                    <Text text={'3'} className={'change-range-number change-range-number-3'}/>,
                                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text
                                        text={+range.minRange3}
                                        className={'change-range-field'}/>
                                        <Text text={"-"} className={'change-range-sep'}/>
                                        <Text text={+range.minRange4 - 1} className={'change-range-field'}/>
                                    </div>], [
                                    <Text text={'2'} className={'change-range-number change-range-number-2'}/>,
                                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}><Text
                                        text={+range.minValue}
                                        className={'change-range-field'}/>
                                        <Text text={"-"} className={'change-range-sep'}/>
                                        <Text text={+range.minRange3 - 1} className={'change-range-field'}/>
                                    </div>]
                            ]}/>
                        <div style={{
                            marginTop: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 18
                        }}>
                            <h2>Баллы: {labs.getResults()?.reduce((acc, item) => acc + item?.result || 0, 0)}/{range.maxValue}</h2>
                            <h2>Оценка: {grade}</h2>
                            <Button onClick={postResults}
                                    disabled={localStorage.getItem("duyn39*&N#mdp>)I_#H G@#BLDS_@#((ND&&D%%#@") !== 'sdif89br384sdgf77839ds8yf9(MYF&DST)NMW<_U_*MY$#*NYX<_<FJ<SBIDF'}>Отправить
                                результаты</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Results);
