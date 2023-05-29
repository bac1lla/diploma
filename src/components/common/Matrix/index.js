import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Matrix = ({matrix, children, className}) => {
    return (
        <div style={{width: '100%'}}>
            <TableContainer component={Paper} className={className}>
                <Table aria-label="simple table">
                    <TableBody>
                        {matrix.map((row, i) => (
                            <TableRow
                                key={`row-${i}`}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {row.map((cell, i) => (<TableCell align="center" key={`cell-${i}`}>{cell}</TableCell>))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{marginTop: 20}}>
                {children}
            </div>
        </div>
    );
};

export default Matrix;