import {observer} from "mobx-react-lite";
import React, {useState} from 'react';
import {generatePath, useLocation, useNavigate, useParams} from "react-router";
import {Steps} from "rsuite";
import {ROUTE__MATRIX_LABS, ROUTE__RESULTS, ROUTE__VECTOR_LAB} from "../../../constants/routes";


const Stepper = ({steps, next, current, setStep}) => {
    const location = useLocation()
    // const [currentStep, setCurrentStep] = useState(parseInt(location.pathname.split('/').pop()) - 1 || 0)
    const navigate = useNavigate()
    const exactLocation = location.pathname.includes('matrix') ? ROUTE__MATRIX_LABS : ROUTE__VECTOR_LAB

    const handleClick = i => {
        setStep(i)
        navigate(`${exactLocation}/${i + 1}`);
    }

    const handleResults = () => {
        setStep(steps.length);
        navigate(ROUTE__RESULTS);
    }

    return (
        <Steps current={current} className={'stepper'}>
            {steps.map((step, i) => <Steps.Item key={i} onClick={() => handleClick(i)}/>)}
            <Steps.Item title="Result" icon={null} onClick={handleResults}/>
        </Steps>
    );
};

export default observer(Stepper);