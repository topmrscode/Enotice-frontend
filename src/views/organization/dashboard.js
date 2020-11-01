import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import auth_utils from "../../helpers/Auth";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Colxx xxs="12" className="mb-4">
          <Row>Dashboard</Row>
        </Colxx>
      </Fragment>
    );
  }
}
