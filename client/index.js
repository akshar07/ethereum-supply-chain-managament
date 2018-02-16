import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Link,Switch
  } from 'react-router-dom'
import './index.css';
import Main from './components/Main';

ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
