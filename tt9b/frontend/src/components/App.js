import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "@babel/polyfill";

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { loadUser } from "../actions/auth";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import store from "../store";

import Alerts from "./layout/Alerts";
import AlertTemplate from "react-alert-template-basic";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import Header from "./layout/Header";
import RoutinesDashboard from "./routines/Dashboard";
import TimeViewsDashboard from "./timeviews/Dashboard";
import Stopwatch from "./timeviews/Stopwatch";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <PrivateRoute exact path="/" component={RoutinesDashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/stopwatch" component={Stopwatch} />
                <PrivateRoute exact path="/routine" component={TimeViewsDashboard} />
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
