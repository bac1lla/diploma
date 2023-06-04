import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {generatePath, Outlet, Route, Routes} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LAB, ROUTE__VECTOR_LABS} from "../../../constants/routes";
import {Context} from "../../../index";
import Stepper from "../../common/Stepper";

const TASKS_COUNT = 5;


const createRoutes = (i) => {
    return "/" + i
}

const Vector = ({step, nextStep, setStep}) => {

    const {labs} = useContext(Context);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <Outlet/>
            <Stepper steps={[0, 1, 2, 3]} next={nextStep} current={step} setStep={setStep}/>
        </div>
    );
};

export default observer(Vector);