/************************************
 * Author: Harmanpreet Singh
 * Task: Currency converter
 * Date: Sept 25th, 2018
 ************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import createBrowserHistory from "history/createBrowserHistory";
import { Route, Router } from "react-router";
import rootSaga from './sagas';
import reducer from './reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Creating saga middleware for redux. 
const sagaMiddleware = createSagaMiddleware();
let devToolsExtension = f => f;

if (window.devToolsExtension) {
  devToolsExtension = window.devToolsExtension();
}

//Creating store for using inside the whole application.
const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), devToolsExtension));
sagaMiddleware.run(rootSaga);

const customHistory = createBrowserHistory();

const Root = () => (
    <Router history={customHistory}>
        <Route exact path="/" component={App}/>
    </Router>
);

ReactDOM.render(
    <Provider store={store}> 
        <Root />
    </Provider>,document.getElementById('root'));
registerServiceWorker();
