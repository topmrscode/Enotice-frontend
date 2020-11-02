import React from "react";
import { Label, FormGroup, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import IntlMessages from "../../helpers/IntlMessages";

export function LoginForm({
  onSubmit: handleSubmit,
  error,
  initialValues,
  validators,
  props,
}) {
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Formik
        initialValues={{
          name: initialValues.email,
          password: initialValues.password,
        }}
        onSubmit={handleSubmit}
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
                validate={validators.validateEmail}
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback d-block">{errors.email}</div>
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
                validate={validators.validatePassword}
              />
              {errors.password && touched.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )}
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center">
              <span />
              <Button
                color="primary"
                className={`btn-shadow btn-multiple-state btn-square ${
                  props.loading ? "show-spinner" : ""
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
  );
}
