import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Amplify, { Auth } from "aws-amplify";
import { Provider, useSelector } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import store, { AppState } from "./store/store";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import awsExports from "./aws-exports";
import Notifier from "./utils/components/Notifier";
import { isLocalhost, hasLocalhost, hasHostname } from "./utils";

const urlsIn = awsExports.oauth.redirectSignIn.split(",");
const urlsOut = awsExports.oauth.redirectSignOut.split(",");

const oauth = {
  domain: awsExports.oauth.domain,
  scope: awsExports.oauth.scope,
  redirectSignIn: awsExports.oauth.redirectSignIn,
  redirectSignOut: awsExports.oauth.redirectSignOut,
  responseType: awsExports.oauth.responseType,
};

/**
 * Sets the correct oauth redirect sign-in/sign-out variables depending on
 * if the user is accessing from the localhost or production.
 */
if (isLocalhost) {
  urlsIn.forEach((e: string): void => {
    if (hasLocalhost(e)) {
      oauth.redirectSignIn = e; // will be localhost
    }
  });
  urlsOut.forEach((e: string): void => {
    if (hasLocalhost(e)) {
      oauth.redirectSignOut = e; // will be localhost
    }
  });
} else {
  urlsIn.forEach((e: string): void => {
    if (hasHostname(e)) {
      oauth.redirectSignIn = e; // will be xxx.amplifyapp.com
    }
  });
  urlsOut.forEach((e: string): void => {
    if (hasHostname(e)) {
      oauth.redirectSignOut = e; // will be xxx.amplifyapp.com
    }
  });
}

const configUpdate = awsExports;
configUpdate.oauth = oauth;

Amplify.configure({
  ...configUpdate,
  Auth: {
    mandatorySignIn: false,
  },
});

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Notifier />
      <AppRouter />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
