import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from "reactstrap";

// import { logout } from '../../requests/Auth'
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
  menuHiddenBreakpoint,
  localeOptions,
} from "../../constants/defaultValues";
import TopnavNotifications from "./Topnav.Notifications";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
// import {
//   listNotifications,
//   clearNotifications,
// } from "../../requests/Notifications";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      notifications: [],
    };
    // this.clearNotificationsFunc = this.clearNotificationsFunc.bind(this);
  }
  // gestion des notifications, toutes les 2 secondes
  componentDidMount() {
    this.timer_id = setInterval(() => this.fetchNotifications(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer_id);
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
  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: "",
      });
    }
  };
  handleSearchInputChange = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };
  handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
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

  // handleLogout = () => {
  //   logout().then(() => {
  //     auth_utils.clear_authentication();
  //     this.props.history.push("/auth/login");
  //   });
  // };

  // REDIRECTION SETTING PAGE ------------------------------
  // handleSettings = () => {
  //   this.props.history.push("/schools/settings");
  // };
  // ---------------------------------------------------------

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

  // // // NOTIFICATIONS GESTION
  // fetchNotifications() {
  //   listNotifications().then((data) => {
  //     if (data.error == null) {
  //       this.setState({ notifications: data.data });
  //     }
  //   });
  // }
  // clearNotificationsFunc() {
  //   clearNotifications();
  // }

  render() {
    const me = auth_utils.is_authenticated().organization;

    const { containerClassnames, menuClickCount, locale } = this.props;
    const { messages } = this.props.intl;
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
        <a className="navbar-logo" href="/schools">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <a className="navbar-logo1" href="/schools">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="navbar-right">
          <div className="header-icons d-inline-block align-middle">
            {/* NOTIFICATIOMS */}

            <TopnavNotifications
              notifications={this.state.notifications}
              // clearNotifications={this.clearNotificationsFunc}
            />

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
                  {me.name}
                  <img src="/assets/img/login-balloon.png" />
                </span>
              </DropdownToggle>
              {/* <DropdownMenu className="mt-3" right>
                <DropdownItem onClick={() => this.handleSettings()}>
                  <IntlMessages id="menu.settings" />{" "}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  <IntlMessages id="menu.signout" />{" "}
                </DropdownItem>
              </DropdownMenu> */}
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
