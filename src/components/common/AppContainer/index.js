import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {isEmpty} from "lodash/lang";
import {next} from "lodash/seq";
import {observer} from "mobx-react-lite";
import React, {useCallback, useContext, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {
    ROUTE__LOGIN,
    ROUTE__MATRIX_LAB,
    ROUTE__MATRIX_LABS,
    ROUTE__MATRIX_TEST,
    ROUTE__REGISTRATION,
    ROUTE__SELECT_LAB,
    ROUTE__TEACHER_PROFILE,
    ROUTE__UNKNOWN,
    ROUTE__VECTOR_LABS
} from "../../../constants/routes";
import {Context} from "../../../index";
import Matrix from "../../common/Matrix";
import MainLayout from "../../layouts/MainLayout";
import MatrixPage from "../../pages/Matrix";
import Type1Matrix from "../../pages/Matrix/Type1Matrix";
import Type2Matrix from "../../pages/Matrix/Type2Matrix";
import Type3Matrix from "../../pages/Matrix/Type3Matrix";
import Type4Matrix from "../../pages/Matrix/Type4Matrix";
import Type5Matrix from "../../pages/Matrix/Type5Matrix";
import Type6Matrix from "../../pages/Matrix/Type6Matrix";
import Type7Matrix from "../../pages/Matrix/Type7Matrix";
import PayMatrix from "../../pages/PayMatrix";
import PaymentMatrix from "../../pages/PayMatrix/PaymentMatrix";
import Results from "../../pages/Results";
import SelectLab from "../../pages/SelectLab";
import TeacherProfile from "../../pages/TeacherProfile";
import Vector from "../../pages/Vector";
import Type2_1 from "../../pages/Vector/Type2_1";
import Type2_2 from "../../pages/Vector/Type2_2";
import Type3 from "../../pages/Vector/Type3";
import Login from "../Login";
import VectorTheory from "../VectorTheory";

export const generateMatrix = (rows, cols) => {
    // Helper function to generate a random integer between min and max (inclusive)
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const matrix = [];

    // Generate the matrix with random values
    for (let i = 0; i < rows; i++) {
        const row = [];

        // Generate random values for each element in the row
        for (let j = 0; j < cols; j++) {
            row.push(getRandomInt(1, 20) - 10);
        }

        matrix.push(row);
    }

    return matrix
}

const AppContainer = () => {
    const {user, labs} = useContext(Context)
    const [currentStep, setStep] = useState(+localStorage.getItem('step') || 0)
    const [openMatrixModal, setOpenMatrixModal] = useState(false)
    const [openMatrixTheory, setOpenMatrixTheory] = useState(false)
    const [openVectorTheory, setOpenVectorTheory] = useState(false)
    const [openPaymentTheory, setOpenPaymentTheory] = useState(false)

    const [finishedSteps, setFinishedSteps] = useState([])

    const handleCloseModal = useCallback(() => setOpenMatrixModal(false), []);
    const handleCloseMatrix = useCallback(() => setOpenMatrixTheory(false), []);
    const handleCloseVector = useCallback(() => setOpenVectorTheory(false), []);
    const handleClosePayment = useCallback(() => setOpenPaymentTheory(false), []);
    const handleSetModal = useCallback((bool) => setOpenMatrixModal(bool), []);
    const handleSetMatrixTheory = useCallback((bool) => setOpenMatrixTheory(bool), []);
    const handleSetVectorTheory = useCallback((bool) => setOpenVectorTheory(bool), []);
    const handleSetPaymentTheory = useCallback((bool) => setOpenPaymentTheory(bool), []);

    const MatrixVariant = labs.matrix(16, 4);

    const handleNextStep = useCallback(() => {
        let startStep = 0;
        let nextStep;

        setStep(prev => {
            let local = JSON.parse(localStorage.getItem('finishedSteps')) || []
            let finished = [...local, prev].sort((a, b) => a - b)
            setFinishedSteps(finished);
            localStorage.setItem('finishedSteps', JSON.stringify(finished))

            for (let i = 0; i < finished.length; i++) {
                if (finished[i] !== i) {
                    nextStep = i;
                    break
                }
            }

            if (nextStep === undefined) {
                nextStep = finished[finished.length - 1] + 1;

                return nextStep
            }

            return nextStep
        })
        localStorage.setItem('step', nextStep)
        return nextStep;
    }, [finishedSteps])

    const handleSetStep = useCallback(step => {
        if (finishedSteps.includes(step)) {
            return;
        }
        setStep(step)
    }, [finishedSteps])

    if (user.isTeacher() && user.isAuth()) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path={ROUTE__TEACHER_PROFILE} element={<TeacherProfile/>}/>
                        <Route path={ROUTE__UNKNOWN} element={<TeacherProfile/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    if (!user.isAuth()) {
        return (<BrowserRouter>
            <Routes>
                <Route path={ROUTE__LOGIN} element={<Login/>}/>
                <Route path={ROUTE__REGISTRATION} element={<Login/>}/>
                <Route path={ROUTE__UNKNOWN} element={<Login/>}/>
            </Routes>
        </BrowserRouter>)
    }

    const postMatrixResultsToBD = () => {
        const {name, group} = user.getUser();
        labs.postResultsToBd({name, group, lab: 'matrix'})
    }

    const postVectorResultsToBD = () => {
        const {name, group} = user.getUser();
        labs.postResultsToBd({name, group, lab: 'vector'})
    }


    return (
        <>
            <BrowserRouter>
                <Modal show={openMatrixModal} onHide={handleCloseModal} size="xl">
                    <Matrix matrix={MatrixVariant} style={{padding: 50}}
                            size={'small'} ariaLabel={"a dense table"}
                            head={
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={'center'} className={'table-head-cell'}>Сочетание номеров
                                            стратегий</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>Выигрыш 1-го
                                            игрока</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>Выигрыш 2-го
                                            игрока</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>Выигрыш 3-го
                                            игрока</TableCell>
                                        <TableCell align={'center'} className={'table-head-cell'}>Выигрыш 4-го
                                            игрока</TableCell>
                                    </TableRow>
                                </TableHead>
                            }
                            firstColumn={
                                [
                                    <TableCell align={'center'} className={'table-head-cell'}>1,1,1,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,1,1,2</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,1,2,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,1,2,2</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,2,1,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,2,1,2</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,2,2,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>1,2,2,2</TableCell>,

                                    <TableCell align={'center'} className={'table-head-cell'}>2,1,1,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,1,1,2</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,1,2,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,1,2,2</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,2,1,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,2,1,2</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,2,2,1</TableCell>,
                                    <TableCell align={'center'} className={'table-head-cell'}>2,2,2,2</TableCell>
                                ]
                            }
                    />
                </Modal>
                <Modal show={openMatrixTheory} onHide={handleCloseMatrix} size="xl">
                    МАТРИЧНЫЕ ИГРЫ тЕОРИЯ
                </Modal>
                <Modal show={openVectorTheory} onHide={handleCloseVector} size="xl">
                    <VectorTheory/>
                </Modal>
                <Modal show={openPaymentTheory} onHide={handleClosePayment} size="xl">
                    ПЛАТЕЖНЫЕ МаТРИЦЫ ТЕОРИЯ
                </Modal>
                <Routes>
                    <Route element={<MainLayout setModal={handleSetModal} setVector={handleSetVectorTheory}
                                                setMatrix={handleSetMatrixTheory}
                                                setPayment={handleSetPaymentTheory}/>}>
                        <Route path={ROUTE__VECTOR_LABS}
                               element={<Vector step={currentStep} nextStep={handleNextStep} setStep={handleSetStep}/>}>
                            <Route path={ROUTE__VECTOR_LABS + '/0'} element={<Type2_1 next={handleNextStep}/>}/>
                            <Route path={ROUTE__VECTOR_LABS + '/1'} element={<Type2_2 next={handleNextStep}/>}/>
                            <Route path={ROUTE__VECTOR_LABS + '/2'} element={<Type3 next={handleNextStep}/>}/>
                            <Route
                                path={ROUTE__VECTOR_LABS + '/3'}
                                element={<Results api={postVectorResultsToBD}/>}
                            />
                        </Route>
                        {/*<Route path={ROUTE__MATRIX_TEST}*/}
                        {/*       element={<PayMatrix step={currentStep} nextStep={handleNextStep}*/}
                        {/*                           setStep={handleSetStep}/>}>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/0'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={2} columns={3} rows={3}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/1'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={3} columns={4} rows={3}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/2'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={4} columns={5} rows={4}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/3'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={5} columns={5} rows={4}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/4'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={6} columns={6} rows={5}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/5'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={7} columns={6} rows={5}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    <Route path={ROUTE__MATRIX_TEST + '/6'}*/}
                        {/*           element={<PaymentMatrix step={currentStep} goTo={'results'} columns={6} rows={6}*/}
                        {/*                                   next={handleNextStep}/>}/>*/}
                        {/*    /!*<Route path={ROUTE__MATRIX_TEST + '/8'}*!/*/}
                        {/*    /!*       element={<PaymentMatrix step={currentStep} goTo={'results'} columns={8} rows={8}*!/*/}
                        {/*    /!*                               needToPost={true} next={handleNextStep}/>}/>*!/*/}
                        {/*    <Route*/}
                        {/*        path={ROUTE__MATRIX_TEST + '/results'}*/}
                        {/*        element={<Results/>}*/}
                        {/*    />*/}
                        {/*</Route>*/}
                        <Route path={ROUTE__MATRIX_LAB}
                               element={<MatrixPage step={currentStep} nextStep={handleNextStep}
                                                    setStep={handleSetStep} finishedSteps={finishedSteps}/>}>
                            <Route path={ROUTE__MATRIX_LABS + '/0'}
                                   element={<Type1Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            <Route path={ROUTE__MATRIX_LABS + '/1'}
                                   element={<Type2Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            <Route path={ROUTE__MATRIX_LABS + '/2'}
                                   element={<Type3Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            <Route path={ROUTE__MATRIX_LABS + '/3'}
                                   element={<Type4Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            <Route path={ROUTE__MATRIX_LABS + '/4'}
                                   element={<Type5Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            <Route path={ROUTE__MATRIX_LABS + '/5'}
                                   element={<Type6Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            <Route path={ROUTE__MATRIX_LABS + '/6'}
                                   element={<Type7Matrix next={handleNextStep} task={MatrixVariant}/>}/>
                            {/*<Route path={ROUTE__MATRIX_LABS + '/8'}*/}
                            {/*       element={<Type8Matrix next={handleNextStep} task={MatrixVariant}/>}/>*/}
                            <Route path={ROUTE__MATRIX_LABS + '/7'}
                                   element={<Results api={postMatrixResultsToBD}/>}/>
                        </Route>
                    </Route>
                    <Route path={ROUTE__SELECT_LAB} element={<SelectLab setStep={handleSetStep}/>}/>
                    <Route path={ROUTE__UNKNOWN} element={<SelectLab setStep={handleSetStep}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default observer(AppContainer);