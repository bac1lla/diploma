import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state from "./store";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'rsuite/dist/rsuite.min.css';

export const Context = createContext(state)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={state}>
        <App />
    </Context.Provider>
);
