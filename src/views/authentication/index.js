import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import OrganizationLayout from "../../layout/OrganizationLayout";

const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));

const Auth = ({ match }) => {
  return (
    <OrganizationLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </OrganizationLayout>
  );
};

export default Auth;
