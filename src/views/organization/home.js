import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import auth_utils from "../../helpers/Auth";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const me = auth_utils.is_authenticated().organization;
    return (
      <Fragment>
        <Colxx xxs="12" className="mb-4">
          <Row>hello</Row>
        </Colxx>
      </Fragment>
    );
  }
}
