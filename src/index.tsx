import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store";
import NewAccount from "./components/NewAccount";
import UserInfo from "./components/UserInfo";
import AssignJobs from "./components/AssignJobs/AssignJobs";
import UpdateUser from "./components/UpdateUser";

ReactDOM.render(
  <Provider store={store}>
    <h1>Henry</h1>
    <App></App>
    <NewAccount></NewAccount>
    <UserInfo></UserInfo>
    <AssignJobs></AssignJobs>
    <UpdateUser/>
  </Provider>,
  document.querySelector("#root")
);
