import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "../components/common/CustomBootstrap";
import { fetchPublicProduct } from "../requests/products";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TopnavPublic from "../containers/navs/TopnavPublic";

class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: null,
      errors: null,
    };
  }
  async componentDidMount() {
    const productId = this.props.match.params.id;
    const response = await fetchPublicProduct(productId);
    console.log(response);
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
    const containerClassnames = "menu-default main-hidden sub-hidden";
    const { product, errors } = this.state;
    if (errors) {
      return <div>{errors}</div>;
    }
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <div id="app-container" className={containerClassnames}>
        <TopnavPublic history={this.props.history} />
        <main>
          <div className="container-fluid">
            <Fragment>
              <Row>
                <Colxx xxs="12">
                  <h1>{product.reference}</h1>
                  <Separator className="mb-5" />
                </Colxx>
              </Row>
              <Row>
                <Colxx md="6" className="mb-4">
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${product.videoId}`}
                  />
                </Colxx>
                <Colxx md="6" className="mb-4">
                  <iframe
                    src={`${product.fileUrl}`}
                    style={{ width: "100%", height: "500px" }}
                    frameborder="0"
                  />
                </Colxx>
              </Row>
            </Fragment>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Public));
