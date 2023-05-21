import {observer} from "mobx-react-lite";
import React from 'react';
import Matrix from "../../../common/Matrix";

const Type2 = ({description, explanation, matrix}) => {
    return (
        <div>
            <p>{description}</p>
            <Matrix matrix={matrix}/>
            <p>{explanation}</p>
        </div>
    );
};

export default observer(Type2);