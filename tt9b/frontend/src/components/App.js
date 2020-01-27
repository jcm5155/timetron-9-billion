import "@babel/polyfill";
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { loadUser } from "../actions/auth";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import store from "../store";

import Alerts from "./layout/Alerts";
import AlertTemplate from "react-alert-template-basic";
import Login from "./accounts/Login";
import Header from "./layout/Header";
import HomeDashboard from "./home/Dashboard";
import PrivateRoute from "./common/PrivateRoute";
import Register from "./accounts/Register";
import RoutineDashboard from "./routine/Dashboard";
import StopWatchDashboard from "./stopwatch/Dashboard";

import Container from "react-bootstrap/Container";

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
              <Container>
                <PrivateRoute exact path="/" component={HomeDashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/stopwatch" component={StopWatchDashboard} />
                <PrivateRoute exact path="/routine" component={RoutineDashboard} />
              </Container>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
