import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";

import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

import { validateEmail, validatePassword, validateName } from "../../helpers/Validators";

import { createOrganization } from "../../requests/organizations";
import auth_utils from "../../helpers/Auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      initialValues: { email: null, password: null, name: null, password_confirm: null },
    };
  }

  onSubmit = async (values) => {
    const response = await createOrganization(values);

    if (response.error != null) {
      this.setState({ error: response.error.message });
      NotificationManager.error(
        "Please try again with other credentials",
        "Account creation failed !",
        3000,
        null,
        null,
        ""
      );  
      return ;
    }

    NotificationManager.success(
      "Your can now use it and access to the platform",
      "Account created !",
      3000,
      null,
      null,
      ""
    );
    auth_utils.authenticate(response.data);
    this.props.history.push("/auth/login");
  };


  validateRegisterForm = (values) => {
    let error = {};
    
    if (values.password != values.password_confirm) {
      error.password_confirm = "Passwords don't match"
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
                <IntlMessages id="organization.register-side" />
                <br />
                <IntlMessages id="organization.register-side-sub" />
                <NavLink to={`/auth/login`}>
                  <IntlMessages id="organization.register-side-link" />
                </NavLink>
              </p>
            </div>
            <div className="form-side">
              <span className="logo-single" />
              <CardTitle className="mb-4">
                <IntlMessages id="organization.register-title" />
              </CardTitle>
              {this.state.error && (
                <p style={{ color: "red" }}>{this.state.error}</p>
              )}

              <Formik
                validate={this.validateRegisterForm}
                initialValues={{
                  name: this.state.initialValues.email,
                  password: this.state.initialValues.password,
                  name: this.state.initialValues.name,
                  password_confirm: this.state.initialValues.password_confirm,
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
                        validate={validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="organization.name" />
                      </Label>
                      <Field
                        className="form-control"
                        type="name"
                        name="name"
                        validate={validateName}
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
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
                        validate={validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="organization.password_confirm" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password_confirm"
                        validate={validatePassword}
                      />
                      {errors.password_confirm && touched.password_confirm && (
                        <div className="invalid-feedback d-block">
                          {errors.password_confirm}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <span />
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state btn-square${
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
                          <IntlMessages id="organization.register-button" />
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
