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

const fetchPublicProduct = async (id) => {
  let response = await fetch(`${API_BASE_URL}/products/${id}/public`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const saveProduct = async (values, file) => {
  // upload
  const data = new FormData();
  data.append("file", file);
  data.append("reference", values.reference);
  data.append("videoId", values.videoId);

  let token = auth_utils.is_authenticated().token;
  let response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return await response.json();
};

const editProduct = async (values, file, id) => {
  // upload
  const data = new FormData();
  data.append("file", file);
  data.append("reference", values.reference);
  data.append("videoId", values.videoId);

  let token = auth_utils.is_authenticated().token;
  let response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return await response.json();
};

const removeProduct = async (id) => {
  let token = auth_utils.is_authenticated().token;
  await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  listProducts,
  fetchProduct,
  fetchPublicProduct,
  saveProduct,
  removeProduct,
  editProduct,
};
