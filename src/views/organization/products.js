import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import ProductList from "../../components/pages/ProductList";
import Pagination from "../../components/common/Pagination";
import ListPageHeading from "../../components/pages/ListPageHeading";
// import AddNewModal from "../../../../containers/pages/AddNewModal";
import { listProducts } from "../../requests/products";

class Products extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      selectedPageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],

      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.dataListRender();
  }

  // toggleModal = () => {
  //   this.setState({
  //     modalOpen: !this.state.modalOpen,
  //   });
  // };

  changePageSize = (size) => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1,
      },
      () => this.dataListRender()
    );
  };

  onChangePage = (page) => {
    this.setState(
      {
        currentPage: page,
      },
      () => this.dataListRender()
    );
  };

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id,
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((x) => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems,
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems,
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll = (isToggle) => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: [],
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map((x) => x._id),
      });
    }
    document.activeElement.blur();
    return false;
  };

  async dataListRender() {
    const { selectedPageSize, currentPage } = this.state;
    const offset = (currentPage - 1) * selectedPageSize;
    const response = await listProducts(offset, selectedPageSize);
    // gestion erreurs !!!!!!
    console.log(response);
    this.setState({
      totalPage: Math.ceil(response.data.total / selectedPageSize),
      items: response.data.products,
      selectedItems: [],
      totalItemCount: response.data.total,
      isLoading: true,
    });
  }

  render() {
    const {
      currentPage,
      items,
      selectedPageSize,
      totalItemCount,
      selectedItems,
      pageSizes,
      // modalOpen,
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="menu.data-list"
            handleChangeSelectAll={this.handleChangeSelectAll}
            changePageSize={this.changePageSize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            pageSizes={pageSizes}
            // toggleModal={this.toggleModal}
          />
          {/* <AddNewModal
            modalOpen={modalOpen}
            toggleModal={this.toggleModal}
            categories={categories}
          /> */}
          <Row>
            {this.state.items.map((product) => {
              return (
                <ProductList
                  key={product._id}
                  product={product}
                  isSelect={this.state.selectedItems.includes(product._id)}
                  onCheckItem={this.onCheckItem}
                />
              );
            })}
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={this.state.totalPage}
              onChangePage={(i) => this.onChangePage(i)}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default Products;
