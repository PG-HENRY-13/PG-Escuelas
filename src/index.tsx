import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store";
import NewAccount from "./components/NewAccount";
import UserInfo from "./components/UserInfo";
import AssignJobs from "./components/AssignJobs/AssignJobs";
import FilterUser from "./components/FilterUser";

ReactDOM.render(
  <Provider store={store}>
    <h1>Henry</h1>
    <App></App>
    <NewAccount></NewAccount>
    <FilterUser></FilterUser>
    <UserInfo></UserInfo>
    <AssignJobs></AssignJobs>
  </Provider>,
  document.querySelector("#root")
);
