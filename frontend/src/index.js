import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";

// defaults for axios
axios.defaults.baseURL = 'http://localhost:5001'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


 //"start": "HOST='127.0.0.1' PORT='5000' react-scripts start",
