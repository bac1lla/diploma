import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {Spinner} from "react-bootstrap";
import {Route, RouterProvider, Routes} from "react-router";
import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import {
    ROUTE__UNKNOWN,
    ROUTE__LOGIN,
    ROUTE__REGISTRATION,
    ROUTE__SELECT_LAB,
    ROUTE__MATRIX_LAB, ROUTE__VECTOR_LAB, ROUTE__VECTOR_LABS, ROUTE__MATRIX_LABS
} from "../../../constants/routes";
import {Context} from "../../../index";
import MainLayout from "../../layouts/MainLayout";
import Results from "../../pages/Results";
import SelectLab from "../../pages/SelectLab";
import Vector from "../../pages/Vector";
import Type1 from "../../pages/Vector/Type1";
import Type2 from "../../pages/Vector/Type2";
import Type3 from "../../pages/Vector/Type3";
import Login from "../Login";
import LoadingSpinner from "../Spinner";

const AppContainer = () => {

    const {user, labs} = useContext(Context)

    if (user.isLoading()) {
        return <LoadingSpinner/>
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

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path={ROUTE__VECTOR_LABS} element={<Vector/>}>
                        <Route path={ROUTE__VECTOR_LABS + '/1'} element={<Type1/>}/>
                        <Route path={ROUTE__VECTOR_LABS + '/2'} element={<Type1/>}/>
                        <Route path={ROUTE__VECTOR_LABS + '/3'}
                               element={<Type2 description={"sdfjkwehmipwef"} matrix={[[12, 12], [1, 2]]}/>}/>
                        <Route path={ROUTE__VECTOR_LABS + '/4'}
                               element={<Type2 description={"sdfjkwehmipwef"} matrix={[[12, 12], [1, 2]]}/>}/>
                        <Route path={ROUTE__VECTOR_LABS + '/5'} element={<Type3/>}/>
                        <Route path={ROUTE__VECTOR_LABS + '/results'} element={<Results/>}/>
                    </Route>
                    <Route path={ROUTE__MATRIX_LAB} element={<Vector/>}>
                        <Route path={ROUTE__MATRIX_LABS + '/1'} element={<Type1/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/2'} element={<Type1/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/3'} element={<Type2/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/4'} element={<Type2/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/5'} element={<Type3/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/6'} element={<Type3/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/7'} element={<Type3/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/8'} element={<Type3/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/results'} element={<Results/>}/>
                    </Route>
                </Route>
                <Route path={ROUTE__SELECT_LAB} element={<SelectLab/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default observer(AppContainer);