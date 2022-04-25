import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <h1>Henry</h1>
        <App></App>
    </Provider>,
    document.querySelector('#root')
);