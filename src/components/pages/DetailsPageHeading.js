import React, { Component } from "react";
import { Row, Button } from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

class DetailsPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const { toggleModal, heading } = this.props;

    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>{heading}</h1>
            <div className="text-zero top-right-button-container">
              <Button
                style={{ width: "10rem" }}
                color="secondary"
                className="top-right-button same-width-btn default mb-2"
                onClick={() => toggleModal.editProduct()}
              >
                <IntlMessages id="products.edit" />
              </Button>
              <Button
                color="primary"
                style={{ marginLeft: "0.25rem" }}
                className="top-right-button same-width-btn default mb-2"
                onClick={() => toggleModal.generateQRcode()}
              >
                <IntlMessages id="products.generate-qrcode" />
              </Button>
            </div>
            <Separator className="mb-5" />
          </div>
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(DetailsPageHeading);
