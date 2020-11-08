import React, { Component } from "react";
import { Row, Card, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { LoginForm } from "../../components/form/LoginForm";
import AppLocale from "../../lang";
import { NotificationManager } from "../../components/common/react-notifications";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { login } from "../../requests/authentication";
import auth_utils from "../../helpers/Auth";
import { REGEX_EMAIL } from "../../constants/utils";

class Login extends Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    this.state = {
      error: null,
      initialValues: { email: "", password: "" },
      currentAppLocale: currentAppLocale,
    };
  }

  onSubmit = async (values) => {
    const response = await login(values);

    if (response.error != null) {
      this.setState({ error: response.error.message });
      return;
    }

    NotificationManager.success(
      this.state.currentAppLocale.messages["notifications.success-login-title"],
      this.state.currentAppLocale.messages[
        "notifications.success-login-content"
      ],
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
                <NavLink to={`/auth/register`}>
                  <IntlMessages id="organization.login-side-link" />
                </NavLink>
              </p>
            </div>
            <div className="form-side">
              <span className="logo-single" />
              <CardTitle className="mb-4">
                <IntlMessages id="organization.login-title" />
              </CardTitle>
              <LoginForm
                error={this.state.error}
                initialValues={this.state.initialValues}
                onSubmit={this.onSubmit}
                validators={{
                  validateEmail: this.validateEmail,
                  validatePassword: this.validatePassword,
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

export default connect(mapStateToProps, mapActionsToProps)(Login);
