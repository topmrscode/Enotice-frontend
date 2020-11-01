import { fetchCurrentOrganization } from "../requests/organizations";

const auth_utils = {
  is_authenticated() {
    if (sessionStorage.getItem("SZ_Key")) {
      return JSON.parse(sessionStorage.getItem("SZ_Key"));
    }
    return false;
  },
  authenticate(data) {
    sessionStorage.setItem("SZ_Key", JSON.stringify(data));
  },
  clear_authentication() {
    sessionStorage.removeItem("SZ_Key");
  },
  update_authentification() {
    var c_organization = JSON.parse(sessionStorage.getItem("SZ_Key"));
    fetchCurrentOrganization().then((data) => {
      c_organization.c_organization = data.data;
      sessionStorage.setItem("SZ_Key", JSON.stringify(c_organization));
    });
  },
};

export default auth_utils;
