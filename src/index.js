import React from "react";
import ReactDOM from "react-dom";

import { Router } from "@reach/router";
import { store } from './store'
import { Provider } from 'react-redux'
import reportWebVitals from "./gc-components/reportWebVitals";
import DefaultErrorBoundary from "./gc-components/errorBoundary";
import { Amplify, API } from 'aws-amplify';

import SigninPage from "./landing/signin";
import DashboardIndexPage from "./dashboard";

//import awsExports from './aws-exports';
//Amplify.configure({
  //...awsExports,
  /* API: {
    endpoints: [ 
      {
        name: "apiAggregatorFunctions",
        endpoint: "https://m0guxo7wmf.execute-api.us-east-1.amazonaws.com/default/paymentAggregatorsEvents-prod"
      }
    ]
  } */
//});




ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <Provider store={store}>
        <Router basepath="/">
          <DashboardIndexPage path="/*" />
          <SigninPage path="/signin/*" />
        </Router>
      </Provider>
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();