import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Router>
    <Route component={Home} />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();