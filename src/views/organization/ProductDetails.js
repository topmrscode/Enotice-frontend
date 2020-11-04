import React, { Component, Fragment } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { connect } from "react-redux";
import {
  Row,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  CardTitle,
  ModalFooter,
} from "reactstrap";
import AppLocale from "../../lang";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { fetchProduct } from "../../requests/products";
import QRCode from "qrcode.react";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const id = this.props.product._id;
    const reference = this.props.product.reference;
    return (
      <div className="print-only center-qrcode">
        <h1 className="title-pdf">{reference}</h1>
        <Card>
          <CardBody>
            <QRCode
              size={200}
              value={`http://localhost:3000/public/products/${id}`}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    this.state = {
      modal: false,
      isLoading: false,
      product: null,
      errors: null,
      display: false,
      currentAppLocale: currentAppLocale,
    };
  }

  async componentDidMount() {
    const productId = this.props.match.params.product_id;
    const response = await fetchProduct(productId);
    if (response.error != null) {
      this.setState({ errors: response.error.message });
      return;
    }
    this.setState({
      product: response.data,
      isLoading: true,
    });
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const { product, errors, display } = this.state;
    if (errors) {
      return <div>{errors}</div>;
    }
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>{product.reference}</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx md="6" className="mb-4">
            <Card className="mb-4">
              <CardTitle>Video</CardTitle>
              <CardBody>
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${product.videoId}`}
                />

                <Button color="primary" outline onClick={this.toggle}>
                  <IntlMessages id="products.generate-qrcode" />
                </Button>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>
                    {product.reference}
                    <IntlMessages id="modal.title-qrcode" />
                  </ModalHeader>
                  <ModalBody>
                    <QRCode
                      className="canvas-to-print"
                      size={150}
                      value={`http://localhost:3000/public/products/${product._id}`}
                    />
                    <ComponentToPrint
                      product={product}
                      ref={(el) => (this.componentRef = el)}
                    />
                    <p className="print-instructions">
                      {
                        this.state.currentAppLocale.messages[
                          "products.print-instructions"
                        ]
                      }
                      ,
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <ReactToPrint content={() => this.componentRef}>
                      <PrintContextConsumer>
                        {({ handlePrint }) => (
                          <Button
                            className="btn-square"
                            color="primary"
                            onClick={handlePrint}
                          >
                            <IntlMessages id="products.print" />
                          </Button>
                        )}
                      </PrintContextConsumer>
                    </ReactToPrint>
                    <Button
                      className="btn-square"
                      color="secondary"
                      onClick={this.toggle}
                    >
                      <IntlMessages id="products.cancel" />
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx md="6" className="mb-4">
            <Card className="mb-4">
              <CardTitle>
                {" "}
                <IntlMessages id="modal.nested-modal" />
              </CardTitle>
              <CardBody>
                <iframe
                  src={`${product.fileUrl}`}
                  style={{ width: "100%", height: "500px" }}
                  frameborder="0"
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ProductDetails);
