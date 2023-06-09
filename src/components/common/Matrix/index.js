import {uniqueId} from "lodash";
import React, {memo} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Matrix = ({
                    matrix,
                    children,
                    className,
                    style,
                    prefix,
                    head,
                    firstColumn,
                    cellClassName,
                    size,
                    ariaLabel,
                    postfix
                }) => {
    return (
        <div style={style || {width: '100%'}}>
            {prefix}
            <TableContainer component={Paper} className={className}>
                <Table aria-label="simple table" size={size} aria-label={ariaLabel}>
                    {head}
                    <TableBody>
                        {matrix?.map((row, i) => (
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {firstColumn?.[i]}
                                {row?.map((cell, i) => (<TableCell align="center"
                                                                   className={cellClassName || ''}>{cell}</TableCell>))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {postfix}
            <div style={{marginTop: 20}}>
                {children}
            </div>
        </div>
    );
};

export default memo(Matrix);