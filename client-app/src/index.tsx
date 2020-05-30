import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import "mobx-react-lite/batchingForReactDom";
import { ScrollToTop } from "./app/layout/ScrollToTop";
import 'react-widgets/dist/css/react-widgets.css';
import dateFnsLocalizer from 'react-widgets-date-fns';
import ja from 'date-fns/locale/ja'

dateFnsLocalizer({ locales: { "ja": ja } });

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
