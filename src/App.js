import './App.css';
import './styles/main.css';
import {observer} from "mobx-react-lite";
import {memo} from "react";
import AppContainer from "./components/common/AppContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <AppContainer />
  );
}

export default observer(App);
