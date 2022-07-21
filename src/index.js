import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import '../node_modules/react-bootstrap/dist/css/react-bootstrap.css'
//import '../node_modules/react-bootstrap/dist/react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
