import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

import { login } from "../../requests/authentication";
import auth_utils from "../../helpers/Auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      initialValues: { email: null, password: null },
    };
  }

  onSubmit = async (values) => {
    const response = await login(values);

    console.log(response);
    if (response.error != null) {
      this.setState({ error: response.error.message });
    }

    NotificationManager.success(
      "You are now logged in.",
      "Welcome back to your account !",
      3000,
      null,
      null,
      ""
    );
    auth_utils.authenticate(response.data);
    this.props.history.push("/organization");
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    }
    return error;
  };

  render() {
    return (
      <Row className="h-100">
        <Colxx xs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="black mb-0">
                <IntlMessages id="organization.login-side" />
                <br />
                <IntlMessages id="organization.login-side-sub" />
                <NavLink to={`/register`}>
                  <IntlMessages id="organization.login-side-link" />
                </NavLink>
              </p>
            </div>
            <div className="form-side">
              <span className="logo-single" />
              <CardTitle className="mb-4">
                <IntlMessages id="organization.login-title" />
              </CardTitle>
              {this.state.error && (
                <p style={{ color: "red" }}>{this.state.error}</p>
              )}

              <Formik
                initialValues={{
                  name: this.state.initialValues.email,
                  password: this.state.initialValues.password,
                }}
                onSubmit={this.onSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="organization.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="organization.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? "show-spinner" : ""
                        }`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="organization.login-button" />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
