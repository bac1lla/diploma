import React from 'react';
import {Button} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";
import {ROUTE__MATRIX_LABS, ROUTE__VECTOR_LAB} from "../../../../constants/routes";

const Type1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const exactLocation = location.pathname.includes('matrix') ? ROUTE__MATRIX_LABS : ROUTE__VECTOR_LAB

    const handleNavigate = () => {
        const num = 1 + parseInt(location.pathname.split('/').pop()) || 0;
        navigate(exactLocation + "/" + num)
    }

    return (
        <div>
            <Button onClick={handleNavigate}>Далее</Button>
        </div>
    );
};

export default Type1;