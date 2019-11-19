import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// is use for redux middleware implementation 
// import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

// import reducer from './store/reducers/reducer.js';
import { store, activateSaga } from './createStore.js';

import App from './App';
import "./../node_modules/font-awesome/css/font-awesome.css";
import './index.css';

// export const middlewares = [reduxThunk];
// export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
// // const store = createStore(reducer);
// const store = createStoreWithMiddleware(reducer);
activateSaga();
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}><App /></Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//{/* <Provider store={store}></Provider> */ }
serviceWorker.unregister();


