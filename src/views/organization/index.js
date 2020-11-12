import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "../../layout/AppLayout";

import Dashboard from "./Dashboard";
import Products from "./Products";
import ProductDetails from "./ProductDetails";

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Route
                exact
                path={`${match.url}/`}
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                exact
                path={`${match.url}/products/:product_id`}
                render={(props) => <ProductDetails {...props} />}
              />
              <Route
                exact
                path={`${match.url}/products`}
                render={(props) => <Products {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
