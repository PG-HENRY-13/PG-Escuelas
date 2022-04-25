import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducers } from '../reducers/index';
// import rootReducer from '../reducers';

const store = createStore(
    // rootReducer,
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;