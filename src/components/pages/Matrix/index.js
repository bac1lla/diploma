import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {generatePath, Outlet, Route, Routes} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LAB, ROUTE__VECTOR_LABS} from "../../../constants/routes";
import {Context} from "../../../index";
import Stepper from "../../common/Stepper";
import Type1 from "./Type1Matrix";

const TASKS_COUNT = 5;


const createRoutes = (i) => {
    return "/" + i
}

const Matrix = ({step, nextStep, setStep}) => {

    const {labs} = useContext(Context);

    return (
        <>
            <Outlet/>
            <Stepper steps={[1234, 1234, 1234, 34, 123, 23, 23, 23]} next={nextStep} current={step} setStep={setStep}/>
        </>
    );
};

export default observer(Matrix);