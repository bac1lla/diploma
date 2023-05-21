import React from 'react';
import {Button} from "react-bootstrap";
import Matrix from "../../../common/Matrix";
import Text from '../../../common/Text'
import Latex from 'react-latex'

const data = [
    ['', 'По Парето', 'По Слейтеру'],
    ['g1(x) -> min; g2(x) -> min', <input style={{width: 150}}/>, <input style={{width: 150}}/>],
    ['g1(x) -> min; g2(x) -> max', <input style={{width: 150}}/>, <input style={{width: 150}}/>],
    ['g1(x) -> max; g2(x) -> min', <input style={{width: 150}}/>, <input style={{width: 150}}/>],
    ['g1(x) -> max; g2(x) -> max', <input style={{width: 150}}/>, <input style={{width: 150}}/>],
]

const description = 'Для критериев g1(x), g2(x) и g3(x), найдите области эффективных векторных оценок на множестве X={x1, x2, x3}, для всех предложенных задач'

const str1 = '1) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) > g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const str2 = '2) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\leq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const str3 = '3) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) < g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\geq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const str4 = '4) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) < g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const str5 = '5) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) > g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) < g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const str6 = '6) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) < g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const str7 = '7) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) < g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\leq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str8 = '8) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) > g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) > g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str9 = '9) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) < g_{1}(x\\\\ \n' +
    ' & g_{2}(x_{0}) < g_{2}(x\n' +
    '\\end{matrix}\\right.$'


const str10 = '10) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) > g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\geq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str11 = '11) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) > g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\leq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str12 = '12) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\geq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\geq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str13 = '13) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) < g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) > g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str14 = '14) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\leq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str15 = '15) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) > g_{2}(x)\n' +
    '\\end{matrix}\\right.$'


const str16 = '16) $\\left\\{\\begin{matrix}\n' +
    ' & g_{1}(x_{0}) \\leq g_{1}(x)\\\\ \n' +
    ' & g_{2}(x_{0}) \\geq g_{2}(x)\n' +
    '\\end{matrix}\\right.$'

const task = [
    [<Latex style={{width: '20%'}}>{str1}</Latex>,
        <Latex style={{width: '20%'}}>{str2}</Latex>,
        <Latex style={{width: '20%'}}>{str3}</Latex>,
        <Latex style={{width: '20%'}}>{str4}</Latex>],
    [<Latex style={{width: '20%'}}>{str5}</Latex>,
        <Latex style={{width: '20%'}}>{str6}</Latex>,
        <Latex style={{width: '20%'}}>{str7}</Latex>,
        <Latex style={{width: '20%'}}>{str8}</Latex>],
    [<Latex style={{width: '20%'}}>{str9}</Latex>,
        <Latex style={{width: '20%'}}>{str10}</Latex>,
        <Latex style={{width: '20%'}}>{str11}</Latex>,
        <Latex style={{width: '20%'}}>{str12}</Latex>],
    [<Latex style={{width: '20%'}}>{str13}</Latex>,
        <Latex style={{width: '20%'}}>{str14}</Latex>,
        <Latex style={{width: '20%'}}>{str15}</Latex>,
        <Latex style={{width: '20%'}}>{str16}</Latex>],
]

const Type3 = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <Text text={description}/>
            <Matrix matrix={task}/>
            <Matrix matrix={data}/>
            <Button variant='primary' style={{alignSelf: "self-end"}}>Проверить</Button>
        </div>
    );
};

export default Type3;