import { fetchMe } from "../requests/organizations";

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
    var currentOrganization = JSON.parse(sessionStorage.getItem("SZ_Key"));
    fetchMe().then((data) => {
      console.log(data);
      currentOrganization.organization = data.data;
      sessionStorage.setItem("SZ_Key", JSON.stringify(currentOrganization));
    });
  },
};

export default auth_utils;
