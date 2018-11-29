import axios from 'axios'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


export const register = newUser => async dispatch => {
	try {
		const {
			data: { response }
		} = await axios.post('/user/register', newUser);
		return response;
	} catch (error) {
		throw error.response.data;
	}
};

ReactDOM.render(
  <Router>
    <Route component={Home} />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();