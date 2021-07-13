import axios from "axios";
import { getAccessToken } from "../auth/auth";
import jwt_decode from "jwt-decode";
import { getRole } from "../auth/auth";

const url = "https://server-thiepd24.herokuapp.com";

export const login = async (data) => {
  return await axios
    .post(`${url}/login`, {
      username: data.username,
      password: data.password,
    })
    .then(async (res) => {
      const token = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
      localStorage.setItem("userToken", JSON.stringify(token));
      let role;
      await getRole().then((user) => {
        role = user;
      });
      return role;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllUser = async () => {
  return await axios
    .get(`${url}/get-all-user`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const approveUser = async (data) => {
  return await axios
    .post(`${url}/approve-user`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const getProduct = async (type) => {
  return await axios
    .get(`${url}/get-card/${type}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};
