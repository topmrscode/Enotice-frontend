import { API_BASE_URL } from "./base";
import auth_utils from "../helpers/Auth.js";

const login = async (values) => {
  let response = await fetch(`${API_BASE_URL}/organizations/login`, {
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

const logout = async () => {
  let token = auth_utils.is_authenticated().token;
  let response = await fetch(`${API_BASE_URL}/organizations/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  });

  return await response.json();
};

const register = async (values) => {
  let response = await fetch(API_BASE_URL + "organizations", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });
  let parsedResponse = await response.json();

  return parsedResponse;
};

export { login, register, logout };
