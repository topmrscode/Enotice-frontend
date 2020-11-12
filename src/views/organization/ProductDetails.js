import React, { Component, Fragment } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import {
  Row,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import EditProduct from "../../components/pages/EditProduct";
import AppLocale from "../../lang";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { fetchProduct } from "../../requests/products";
import DetailsPageHeading from "../../components/pages/DetailsPageHeading";

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
      isLoading: true,
      product: null,
      errors: null,
      display: false,
      modalOpen: false,
      currentAppLocale: currentAppLocale,
    };
    this.forceRefreshProduct = this.forceRefreshProduct.bind(this);
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
      isLoading: false,
    });
  }

  toggleModalGenearateQRcode = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  toggleModalEditProduct = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  async forceRefreshProduct() {
    const productId = this.state.product._id;
    const response = await fetchProduct(productId);
    if (response.error != null) {
      this.setState({ errors: response.error.message });
      return;
    }
    this.setState({
      product: response.data,
      isLoading: false,
    });
  }

  render() {
    const { product, errors, display } = this.state;
    if (errors) {
      return <div>{errors}</div>;
    }
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <DetailsPageHeading
          heading={product.reference}
          toggleModal={{
            generateQRcode: this.toggleModalGenearateQRcode,
            editProduct: this.toggleModalEditProduct,
          }}
        />
        <EditProduct
          refreshProduct={this.forceRefreshProduct}
          product={this.state.product}
          initialValues={this.state.product}
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModalEditProduct}
        />
        <Row>
          <Colxx md="6" className="mb-4">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${product.videoId}`}
            />
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
                <Button
                  className="default mb-2 same-width-btn"
                  color="secondary"
                  onClick={this.toggleModalGenearateQRcode}
                >
                  <IntlMessages id="products.cancel" />
                </Button>
                <ReactToPrint content={() => this.componentRef}>
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <Button
                        className="default mb-2 same-width-btn"
                        color="primary"
                        onClick={handlePrint}
                      >
                        <IntlMessages id="products.print" />
                      </Button>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
              </ModalFooter>
            </Modal>
          </Colxx>
          <Colxx md="6" className="mb-4">
            <iframe
              src={`${product.file}`}
              style={{ width: "100%", height: "500px" }}
              frameborder="0"
            />
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
