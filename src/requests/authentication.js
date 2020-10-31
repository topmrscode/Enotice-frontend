import { API_BASE_URL } from "./base";

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

export { login, register };
