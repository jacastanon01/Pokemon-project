import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import {SWRConfig} from "swr"
import axios from "axios"
import { useState } from 'react';

const fetcher = (...args) => axios.get(...args).then(res => res.data)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SWRConfig value={{fetcher}}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
