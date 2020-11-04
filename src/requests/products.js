import auth_utils from "../helpers/Auth.js";
import { API_BASE_URL } from "./base";

const listProducts = async (offset, limit) => {
  let token = auth_utils.is_authenticated().token;
  let response = await fetch(
    `${API_BASE_URL}/products?offset=${offset}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

const fetchProduct = async (id) => {
  let token = auth_utils.is_authenticated().token;
  let response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export { listProducts, fetchProduct };
