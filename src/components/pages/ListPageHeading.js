import React, { Component } from "react";
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

class ListPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
    };
  }

  toggleDisplayOptions = () => {
    this.setState((prevState) => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen,
    }));
  };
  toggleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }));
  };

  render() {
    const { messages } = this.props.intl;
    const {
      handleChangeSelectAll,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      startIndex,
      endIndex,
      selectedItemsLength,
      itemsLength,
      pageSizes,
      toggleModal,
      heading,
      onRemove,
    } = this.props;

    const { displayOptionsIsOpen, dropdownSplitOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>

            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button default mb-2"
                onClick={() => toggleModal()}
              >
                <IntlMessages id="pages.add-new" />
              </Button>
              <ButtonDropdown
                style={{ marginLeft: "20px" }}
                isOpen={dropdownSplitOpen}
                toggle={this.toggleSplit}
              >
                <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all default mb-2">
                  <CustomInput
                    className="custom-checkbox mb-0 d-inline-block"
                    type="checkbox"
                    id="checkAll"
                    checked={selectedItemsLength >= itemsLength}
                    onChange={() => handleChangeSelectAll(true)}
                    label={
                      <span
                        className={`custom-control-label ${
                          selectedItemsLength > 0 &&
                          selectedItemsLength < itemsLength
                            ? "indeterminate"
                            : ""
                        }`}
                      />
                    }
                  />
                </div>
                <DropdownToggle
                  caret
                  color="primary"
                  className="dropdown-toggle-split btn-lg default mb-2"
                />
                <DropdownMenu right>
                  <DropdownItem onClick={() => onRemove()}>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none same-width-btn "
              onClick={this.toggleDisplayOptions}
            >
              <IntlMessages id="pages.display-options" />{" "}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              isOpen={displayOptionsIsOpen}
              className="d-md-block"
              id="displayOptions"
            >
              <div className="d-block d-md-inline-block pt-1">
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    className="default mb-2"
                    disabled
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages["menu.search"]}
                    onKeyPress={(e) => console.log(e)}
                  />
                </div>
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
                <UncontrolledDropdown className="d-inline-block ">
                  <DropdownToggle
                    className="default mb-2"
                    caret
                    color="outline-dark"
                    size="xs"
                  >
                    {selectedPageSize}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {pageSizes.map((size, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changePageSize(size)}
                        >
                          {size}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
