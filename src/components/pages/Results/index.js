import {observer} from "mobx-react-lite";
import React, {useContext} from 'react';
import {Context} from "../../../index";
import Matrix from "../../common/Matrix";

const prepareData = (data) => {
    if (!data) {
        return;
    }

    return data.map(result => [])

}
const Results = () => {
    const {labs} = useContext(Context);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: 'space-between'
        }}>
            <Matrix
                matrix={labs.getResults().map(e => [`Задание ${e?.taskName}`, e?.result])?.sort((a, b) => a?.[0] > b?.[0] ? 1 : -1)}>

                <h2>Result: {labs.getResults().reduce((acc, item) => acc + item?.result || 0, 0)}/{labs.getResults()?.length * 3}</h2>
            </Matrix>
        </div>
    );
};

export default observer(Results);