import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { logout } from "../../requests/authentication";
import auth_utils from "../../helpers/Auth.js";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessages from "../../helpers/IntlMessages";

import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from "../../redux/actions";

import {
  localeOptions,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
    };
  }

  handleChangeLocale = (locale) => {
    this.props.changeLocale(locale);
  };

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  // DECONNECTION ET SUPPRESIION TOKEN --------------------

  handleLogout = async () => {
    const response = await logout()

    auth_utils.clear_authentication();
    this.props.history.push("/auth/login");
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount, locale } = this.props;
    const c_organization = auth_utils.is_authenticated();

    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            className="menu-button d-none d-md-block"
            onClick={(e) =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

          {/* CHOIX DU LANGUAGE */}
          <div className="d-inline-block">
            <UncontrolledDropdown className="ml-2">
              <DropdownToggle
                caret
                color="light"
                size="sm"
                className="language-button"
              >
                <span className="name">{locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {localeOptions.map((l) => {
                  return (
                    <DropdownItem
                      onClick={() => this.handleChangeLocale(l.id)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>

        {/* LOGO */}
        <a className="navbar-logo" href="/organization">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <a className="navbar-logo1" href="/organization">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="navbar-right">
          <div className="header-icons d-inline-block align-middle">
            {/* BOUTON FULSCREEN */}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          {/* BOUTON USER DROPDOWN */}
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span>
                  {c_organization.name}
                  <img src="/assets/img/avatar.png" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {/* <DropdownItem onClick={() => this.handleSettings()}>
                  <IntlMessages id="menu.settings" />{" "}
                </DropdownItem>
                <DropdownItem divider /> */}
                <DropdownItem onClick={() => this.handleLogout()}>
                  <IntlMessages id="menu.logout" />{" "}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    changeLocale,
  })(TopNav)
);
