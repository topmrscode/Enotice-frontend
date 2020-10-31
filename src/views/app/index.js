import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import AppLayout from '../../layout/AppLayout';
import { fetchCurrentUser } from '../../requests/fetchCurrentUser';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CUser: null
    }
  }

  async componentDidUpdate() {
    let CUser = await fetchCurrentUser();
    if (!CUser.status.error) {
      this.setState({
        CUser: CUser
      })
    }
  }

  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}

export default withRouter(App);
