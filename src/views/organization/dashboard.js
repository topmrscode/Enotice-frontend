import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import DashboardCard from "../../components/cards/DashboardCard";
import { listProducts } from "../../requests/products";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      isLoading: true,
      error: null,
    };
  }
  async componentDidMount() {
    const response = await listProducts();
    if (response.error != null) {
      this.setState({ error: response.error.message });
      return;
    }
    this.setState({ total: response.data.total, isLoading: false });
  }

  render() {
    const { messages } = this.props.intl;

    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              <IntlMessages id="menu.dashboard" />
            </h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="4" md="6" className="mb-4">
            <DashboardCard
              icon="iconsminds-clock"
              title={`${this.state.total} ${messages["dashboards.products"]}`}
              detail={messages["dashboards.view-products"]}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default injectIntl(Dashboard);
