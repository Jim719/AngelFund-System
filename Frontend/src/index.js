import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import SwipeTable from './component/SwipeTable';
import App from './App';
import Login from './layouts/Login';
import Sign_up from './layouts/Sign_up';
import HomePage from './view/HomePage';
import Information from './view/Information';
import reportWebVitals from './reportWebVitals';
import IP_Data from './view/IP_Data';
import Txn from './view/Txn';


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <BrowserRouter >
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Signup" component={Sign_up} />
      <Route exact path="/HomePage" component={HomePage} />
      <Route exact path="/Information" component={Information} />
      <Route exact path="/IP_Data" component={IP_Data} />
      <Route exact path="/Txn" component={Txn} />
      <Redirect from="/" to="/Login" />
      
    </Switch>
  </BrowserRouter >,
  // <SwipeTable/> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
