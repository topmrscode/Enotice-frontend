import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

export default class BlankPage extends Component {
    render() {
        return (
            <Fragment>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <p><IntlMessages id="menu.blank-page"/></p>
              </Colxx>
            </Row>
          </Fragment>
        )
    }
}
