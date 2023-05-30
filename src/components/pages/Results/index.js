import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router";
import {ROUTE__VECTOR_LAB__TEACHER} from "../../../constants/routes";
import {Context} from "../../../index";
import {getBDRange} from "../../../services/ApiService";
import Matrix from "../../common/Matrix";
import Text from "../../common/Text";
import './styles.css'

const prepareData = (data) => {
    if (!data) {
        return;
    }

    return data.map(result => [])

}
const Results = ({tasksNames}) => {
    const {labs, user} = useContext(Context);
    const location = useLocation();
    const isVector = location.pathname.includes(ROUTE__VECTOR_LAB__TEACHER)
    const [range, setRange] = useState({})

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
        const labName = isVector ? 'vector' : 'matrix';
        getBDRange(labName)
            .then(range => {
                setRange(range)
            })
            .catch(() => {
                console.log('error')
            })
    }

    useEffect(() => {
        getRange();
    }, [isVector])

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "flex-start",
            gap: 50,
            justifyContent: 'space-between'
        }}>
            <Matrix className={'results-table-student'}
                    style={{width: '100%'}}
                    matrix={labs.getResults()?.map(e => [<span>Задание {e?.i}</span>, <span>{e?.result}/3   </span>])}
                    cellClassName={'table-cell'}
                    head={<TableHead>
                        <TableRow>
                            <TableCell align={'center'} className={'table-head-cell'}>Задание</TableCell>
                            <TableCell align={'center'} className={'table-head-cell'}>Количество баллов</TableCell>
                        </TableRow>
                    </TableHead>}
                // firstColumn={tasksNames}
                    prefix={<h1>Результаты</h1>}>
                <h2>Баллы: {labs.getResults()?.reduce((acc, item) => acc + item?.result || 0, 0)}/{range.maxValue}</h2>
                <h2>Оценка: {grade}</h2>
            </Matrix>
            <div className={'student-range-column'}>
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
    );
};

export default observer(Results);