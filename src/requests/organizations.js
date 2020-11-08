import auth_utils from "../helpers/Auth.js";
import { API_BASE_URL } from "./base";

const fetchCurrentOrganization = async () => {
  let token = auth_utils.is_authenticated().token;
  let response = await fetch(`${API_BASE_URL}/organizations/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

const createOrganization = async (values) => {
  let response = await fetch(`${API_BASE_URL}/organizations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  let parsedResponse = await response.json();

  return parsedResponse;
};

export { fetchCurrentOrganization, createOrganization };
