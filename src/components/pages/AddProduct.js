import React, { Component } from "react";
import { connect } from "react-redux";
import { saveProduct } from "../../requests/products";
import { NotificationManager } from "../common/react-notifications";
import AppLocale from "../../lang";
import AddProductForm from "../form/AddProductForm";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    const { toggleModal } = this.props;
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    this.setRef = this.setRef.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);

    this.state = {
      toggleModal: toggleModal,
      ref: null,
      error: null,
      currentAppLocale: currentAppLocale,
      initialValues: { reference: "", videoId: "" },
      file: null,
    };
  }

  onSubmit = async (values) => {
    const response = await saveProduct(values, this.state.file);
    if (response.error != null) {
      this.setState({ error: response.error.message });
      return;
    }

    this.props.refreshProducts();
    NotificationManager.success(
      this.state.currentAppLocale.messages[
        "notifications.success-create-product-title"
      ],
      this.state.currentAppLocale.messages[
        "notifications.success-create-product-content"
      ],
      3000,
      null,
      null,
      ""
    );
    this.state.toggleModal();
  };

  validateReference = (value) => {
    let error;
    if (!value) {
      error = this.state.currentAppLocale.messages["errors.required-reference"];
    }
    return error;
  };

  validateVideoId = (value) => {
    let error;
    if (!value) {
      error = this.state.currentAppLocale.messages["errors.required-videId"];
    }
    return error;
  };

  handleSubmit = () => {
    if (this.state.ref.current) {
      this.state.ref.current.handleSubmit();
    }
  };

  // upload file
  onChangeFile(event) {
    this.setState({ file: event.currentTarget.files[0] });
  }

  setRef = (ref) => {
    if (ref != this.state.ref) this.setState({ ref: ref });
  };

  render() {
    const ref = React.createRef();
    const { toggleModal, modalOpen } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="products.create-title" />
        </ModalHeader>
        <ModalBody>
          <AddProductForm
            error={this.state.error}
            initialValues={this.state.initialValues}
            setRef={this.setRef}
            onSubmit={this.onSubmit}
            validators={{
              validateReference: this.validateReference,
              validateVideoId: this.validateVideoId,
            }}
            onChangeFile={this.onChangeFile}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className={"default mb-2 same-width-btn"}
            color="secondary"
            onClick={toggleModal}
          >
            <IntlMessages id="products.cancel" />
          </Button>
          <Button
            className={"default mb-2 same-width-btn"}
            color="primary"
            onClick={this.handleSubmit}
          >
            <IntlMessages id="products.add-submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(AddProduct);
