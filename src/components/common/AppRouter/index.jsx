import React, {memo} from 'react';
import {Route, RouterProvider} from "react-router";
import {ROUTE__LOGIN, ROUTE__REGISTRATION, ROUTE__SELECT_LAB} from "../../../constants/routes";
import SelectLab from "../../pages/SelectLab";
import Login from "../Login";

const routes = [
    {
        path: ROUTE__LOGIN,
        element: <Login />
    },
    {
        path: ROUTE__REGISTRATION,
        element: <Login />
    },
    {
        path: ROUTE__SELECT_LAB,
        element: <SelectLab />
    }
]

const AppRouter = () => {

    return routes
        .map(({path, element}) =>
            <Route path={path} element={element} />
        )
    ;
};

export default memo(AppRouter);