import React, { Component } from "react";

class TopNavPublic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar fixed-top">
        {/* LOGO */}
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <a className="navbar-logo1" href="/organization">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
      </nav>
    );
  }
}

export default TopNavPublic;
