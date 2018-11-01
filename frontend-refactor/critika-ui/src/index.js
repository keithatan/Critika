import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Home from './components/Home/Home';
import Test from './components/Test/test';
import SignupPage from './components/SignupPage/SignupPage';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Route path="/" component={ Home }/>
                <Route path="/register" component={ SignupPage }/>

            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));
