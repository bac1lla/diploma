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

const Matrix = ({step, nextStep, setStep, finishedSteps}) => {

    const {labs} = useContext(Context);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between',
        }}>
            <Outlet/>
            <Stepper steps={[0, 1, 2, 3, 4, 5, 6, 7]} next={nextStep} current={step} setStep={setStep}
                     finishedSteps={finishedSteps}/>
        </div>
    );
};

export default observer(Matrix);