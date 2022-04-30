import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store";
import NewAccount from "./components/NewAccount";
<<<<<<< Updated upstream
import UserInfo from "./components/UserInfo"
=======
import UserInfo from "./components/UserInfo";
import AssignJobs from "./components/AssignJobs/AssignJobs";
>>>>>>> Stashed changes

ReactDOM.render(
  <Provider store={store}>
    <h1>Henry</h1>
    <App></App>
    <NewAccount></NewAccount>
    <UserInfo></UserInfo>
    <AssignJobs></AssignJobs>
  </Provider>,
  document.querySelector("#root")
);
