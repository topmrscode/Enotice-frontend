import React, { Component } from "react";
import { Row, Card, CardTitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { RegisterForm } from "../../components/form/RegisterForm";
import { NotificationManager } from "../../components/common/react-notifications";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import AppLocale from "../../lang";
import { createOrganization } from "../../requests/organizations";
import auth_utils from "../../helpers/Auth";
import { REGEX_PASSWORD, REGEX_EMAIL } from "../../constants/utils";

class Register extends Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    this.state = {
      error: null,
      initialValues: {
        email: "",
        password: "",
        name: "",
        password_confirm: "",
      },
      currentAppLocale: currentAppLocale,
    };
  }

  onSubmit = async (values) => {
    const response = await createOrganization(values);

    if (response.error != null) {
      this.setState({ error: response.error.message });
      return;
    }

    NotificationManager.success(
      this.state.currentAppLocale.messages[
        "notifications.success-register-title"
      ],
      this.state.currentAppLocale.messages[
        "notifications.success-register-content"
      ],
      3000,
      null,
      null,
      ""
    );
    auth_utils.authenticate(response.data);
    this.props.history.push("/auth/login");
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = this.state.currentAppLocale.messages["errors.required-email"];
    } else if (!REGEX_EMAIL.test(value)) {
      error = this.state.currentAppLocale.messages["errors.invalid-email"];
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = this.state.currentAppLocale.messages["errors.required-password"];
    } else if (!REGEX_PASSWORD.test(value)) {
      error = this.state.currentAppLocale.messages["errors.invalid-password"];
    }
    return error;
  };

  validatePasswordsMatch = (value) => {
    let error;
    if (!value) {
      error = this.state.currentAppLocale.messages["errors.confirm-passwords"];
    }
    return error;
  };

  validateName = (value) => {
    let error;
    if (!value) {
      error = this.state.currentAppLocale.messages["errors.required-name"];
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
              <RegisterForm
                error={this.state.error}
                initialValues={this.state.initialValues}
                onSubmit={this.onSubmit}
                validators={{
                  validateEmail: this.validateEmail,
                  validatePassword: this.validatePassword,
                  validatePasswordsMatch: this.validatePasswordsMatch,
                  validateName: this.validateName,
                }}
                props={this.props}
              />
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Register);
