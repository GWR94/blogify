import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Amplify, { Auth } from "aws-amplify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/store";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import awsExports from "./aws-exports";
import Notifier from "./utils/components/Notifier";

Amplify.configure({
  ...awsExports,
  Auth: {
    mandatorySignIn: false,
  },
});

const persist = configureStore();
const App = (): JSX.Element => {
  return (
    <Provider store={persist.store}>
      <PersistGate loading={null} persistor={persist.persistor}>
        <Notifier />
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
