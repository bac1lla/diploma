import {observer} from "mobx-react-lite";
import React, {useState} from 'react';
import {generatePath, useLocation, useNavigate, useParams} from "react-router";
import {Steps} from "rsuite";
import {ROUTE__MATRIX_LABS, ROUTE__MATRIX_TEST, ROUTE__RESULTS, ROUTE__VECTOR_LAB} from "../../../constants/routes";
import {uniqueId} from "lodash";

const Stepper = ({steps, next, current, setStep}) => {
    const location = useLocation()
    // const [currentStep, setCurrentStep] = useState(parseInt(location.pathname.split('/').pop()) - 1 || 0)
    const navigate = useNavigate()
    const exactLocation = location.pathname.includes('vector') ? ROUTE__VECTOR_LAB : location.pathname.includes('test') ? ROUTE__MATRIX_TEST : ROUTE__MATRIX_LABS

    const handleClick = i => {
        if (setStatus(i) === 'finish') {
            return
        }
        setStep(i)
        navigate(`${exactLocation}/${i}`);
    }

    // const handleResults = () => {
    //     setStep(steps.length);
    //     navigate(ROUTE__RESULTS);
    // }
    //
    const setStatus = step => {
        let finished = JSON.parse(localStorage.getItem('finishedSteps')) || []
        if (finished.includes(step)) {
            return 'finish'
        }
        if (step === current) {
            return 'process'
        }
        return 'wait'
    }

    return (
        <Steps current={current} className={'stepper'}>
            {steps.map((step, i) => {
                const status = setStatus(step)
                if (i === steps.length - 1) {
                    return <Steps.Item title="Result" icon={null} key={uniqueId()} status={status}/>
                }

                return <Steps.Item key={uniqueId()} onClick={() => handleClick(i)}
                                   status={status}/>
            })
            }
        </Steps>
    );
};

export default observer(Stepper);