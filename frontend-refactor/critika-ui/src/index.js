import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Home from './components/Home/Home';
import Test from './components/Test/test';
import SignupPage from './components/SignupPage/SignupPage';

const store = createStore(
    (state ={}) => state,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/" component={ Home }/>
                <Route path="/register" component={ SignupPage }/>

            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));
