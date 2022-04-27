import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./redux/store";
import NewAccount from "./components/NewAccount";

ReactDOM.render(
  <Provider store={store}>
    <h1>Henry</h1>
    <App></App>
    <NewAccount></NewAccount>
  </Provider>,
  document.querySelector("#root")
);
