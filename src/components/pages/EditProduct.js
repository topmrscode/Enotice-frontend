import React, { Component } from "react";
import { connect } from "react-redux";
import { editProduct } from "../../requests/products";
import { NotificationManager } from "../common/react-notifications";
import AppLocale from "../../lang";
import EditProductForm from "../form/EditProductForm";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

class EditProduct extends Component {
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
      file: null,
    };
  }

  onSubmit = async (values) => {
    this.setState({ error: null });
    const response = await editProduct(
      values,
      this.state.file,
      this.props.product._id
    );
    if (response.error != null) {
      this.setState({ error: response.error.message });
      return;
    }

    this.props.refreshProduct();
    NotificationManager.success(
      this.state.currentAppLocale.messages[
        "notifications.success-edit-product-title"
      ],
      this.state.currentAppLocale.messages[
        "notifications.success-edit-product-content"
      ],
      3000,
      null,
      null,
      ""
    );
    this.setState({ file: null });
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
    const { toggleModal, modalOpen, initialValues } = this.props;

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="products.edit" />
        </ModalHeader>
        <ModalBody>
          <EditProductForm
            error={this.state.error}
            initialValues={initialValues}
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
            <IntlMessages id="products.edit" />
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

export default connect(mapStateToProps, mapActionsToProps)(EditProduct);
