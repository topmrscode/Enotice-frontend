import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./lang";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import AuthRoute from "./helpers/AuthRoute";

import ViewOrganization from "./views/organization";
import ViewAuthenticaton from "./views/authentication";
import ViewError from "./views/error";
import ViewPublic from "./views/public";

class App extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <AuthRoute
                    path="/organization"
                    component={ViewOrganization}
                  />
                  <Route
                    path="/auth"
                    render={(props) => <ViewAuthenticaton {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/public/products/:id"
                    exact
                    render={(props) => <ViewPublic {...props} />}
                  />
                  <Redirect to="/auth/login" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
