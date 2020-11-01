// VERIFICATION QUE L UTILISATEUR EST BIEN CONNECTE AVANT CHAQUE APPEL DE MES COMPONENTS

import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth_utils from "./Auth.js";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth_utils.is_authenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default AuthRoute;
