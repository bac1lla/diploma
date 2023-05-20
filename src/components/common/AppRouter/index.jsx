import React, {memo} from 'react';
import {Route, RouterProvider, Routes} from "react-router";
import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import {ROUTE__LOGIN, ROUTE__REGISTRATION} from "../../../constants/routes";
import Login from "../Login";

const routes = createBrowserRouter([
    {
        path: ROUTE__LOGIN,
        element: <Login />
    },
    {
        path: ROUTE__REGISTRATION,
        element: <Login />
    },
])

const AppRouter = () => {
    const isAuth = false;

    if (true) {
        return
            (<BrowserRouter>
                <Routes>
                    <Route path={ROUTE__LOGIN} element={Login} />
                    <Route path={ROUTE__REGISTRATION} element={Login} />
                </Routes>
            </BrowserRouter>)
    }

    return (
        <RouterProvider router={routes}/>
    );
};

export default memo(AppRouter);