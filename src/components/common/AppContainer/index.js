import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {
    ROUTE__UNKNOWN,
    ROUTE__LOGIN,
    ROUTE__REGISTRATION,
    ROUTE__SELECT_LAB,
    ROUTE__MATRIX_LAB, ROUTE__VECTOR_LABS, ROUTE__MATRIX_LABS, ROUTE__TEACHER_PROFILE
} from "../../../constants/routes";
import {Context} from "../../../index";
import MainLayout from "../../layouts/MainLayout";
import Matrix from "../../pages/Matrix";
import Type1Matrix from "../../pages/Matrix/Type1Matrix";
import Type2Matrix from "../../pages/Matrix/Type2Matrix";
import Type3Matrix from "../../pages/Matrix/Type3Matrix";
import Type4Matrix from "../../pages/Matrix/Type4Matrix";
import Type5Matrix from "../../pages/Matrix/Type5Matrix";
import Type6Matrix from "../../pages/Matrix/Type6Matrix";
import Type7Matrix from "../../pages/Matrix/Type7Matrix";
import Type8Matrix from "../../pages/Matrix/Type8Matrix";
import Results from "../../pages/Results";
import SelectLab from "../../pages/SelectLab";
import TeacherProfile from "../../pages/TeacherProfile";
import Vector from "../../pages/Vector";
import Type1 from "../../pages/Vector/Type1";
import Type2 from "../../pages/Vector/Type2";
import Type3 from "../../pages/Vector/Type3";
import Login from "../Login";

const AppContainer = () => {

    const {user, labs} = useContext(Context)

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
                    <Route path={ROUTE__MATRIX_LAB} element={<Matrix/>}>
                        <Route path={ROUTE__MATRIX_LABS + '/1'} element={<Type1Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/2'} element={<Type2Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/3'} element={<Type3Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/4'} element={<Type4Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/5'} element={<Type5Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/6'} element={<Type6Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/7'} element={<Type7Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/8'} element={<Type8Matrix/>}/>
                        <Route path={ROUTE__MATRIX_LABS + '/results'} element={<Results/>}/>
                    </Route>
                </Route>
                <Route path={ROUTE__SELECT_LAB} element={<SelectLab/>}/>
                <Route path={ROUTE__UNKNOWN} element={<SelectLab/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default observer(AppContainer);