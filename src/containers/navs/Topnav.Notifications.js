import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

// import Timestamp from "react-timestamp";
import IntlMessages from "../../helpers/IntlMessages";
import { NavLink } from "react-router-dom";

// const NotificationItem = ({ message, created_at }) => {
//   return (
//     <div className="d-flex flex-row mb-3 pb-3 border-bottom">
//       <div className="pl-3 pr-2">
//         <NavLink to={"/offers/manage"}>
//           <p className="font-weight-medium mb-1">{message}</p>
//           <p className="text-muted mb-0 text-small">
//             {/* <Timestamp Data={{ created_at }} /> */}
//           </p>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

const TopnavNotifications = ({ notifications, clearNotifications }) => {
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          {/* ICI AFFICHER LE NOMBRE DE NOTIFICATIONS (3 dans l'exemple) */}
          <span className="count">{notifications.length}</span>
        </DropdownToggle>
        {/* <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
        
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >      
            {notifications.length > 0 && notifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification} />;
              
            })}
          
           
            {notifications.length == 0 && (
              <p>You haven't notifications</p>
              )}
               {notifications.length > 0 && (
                 <Button color="info" size="xs" className="mb-2" onClick={() => clearNotifications()}>
                 <IntlMessages id="notifications.clear" />
               </Button>
              )}

          </PerfectScrollbar>
        </DropdownMenu> */}
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
