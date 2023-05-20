import React from 'react';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {ROUTE__UNKNOWN, ROUTE__LOGIN, ROUTE__REGISTRATION} from "../../../constants/routes";
import {getAllStudents} from "../../../services/ApiService";
import MainLayout from "../../layouts/MainLayout";
import AppRouter from "../AppRouter";
import Login from "../Login";
const AppContainer = () => {

    console.log(getAllStudents())

    if (true) {

        return (<BrowserRouter>
            <Routes>
                <Route path={ROUTE__LOGIN} element={<Login/>} />
                <Route path={ROUTE__REGISTRATION} element={<Login/>} />
                <Route path={ROUTE__UNKNOWN} element={<Login/>} />
            </Routes>
        </BrowserRouter>)
    }

    return (
        <MainLayout>
            <AppRouter/>
        </MainLayout>
    );
};

export default AppContainer;