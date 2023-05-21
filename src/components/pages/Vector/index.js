import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {generatePath, Outlet, Route, Routes} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LAB, ROUTE__VECTOR_LABS} from "../../../constants/routes";
import {Context} from "../../../index";
import Stepper from "../../common/Stepper";
import Type1 from "./Type1";
import Type2 from "./Type2";
import Type3 from "./Type3";

const TASKS_COUNT = 5;


const createRoutes = (i) => {
    return "/" + i
}

const Vector = () => {

    const {labs} = useContext(Context);

    return (
        <>
            <Outlet/>
            <Stepper steps={[1234, 1234, 1234, 34, 123]}/>
        </>
    );
};

export default observer(Vector);