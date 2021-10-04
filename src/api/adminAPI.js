import axios from "axios";
import { getAccessToken } from "../auth/auth";
import jwt_decode from "jwt-decode";
import { getRole } from "../auth/auth";

const url = "https://server-thiepd24.herokuapp.com";
// const url = "http://localhost:6688";

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

export const getAllOrder = async (status) => {
  return await axios
    .get(`${url}/get-all-order/${status}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const updateOrder = async (data) => {
  return await axios
    .post(`${url}/update-order`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const deleteCard = async (data) => {
  return await axios
    .post(`${url}/delete-card`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const getDetailsCard = async (cardID) => {
  return await axios
    .get(`${url}/get-details-card/${cardID}`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const updateCard = async (data) => {
  const formData = new FormData();
  if (data.image.file) {
    formData.append("image", data.image.file);
  } else {
    formData.append("image", JSON.stringify(data.image));
  }
  formData.append("cardID", data.cardID);
  formData.append("id", data.id);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("item", JSON.stringify(data.item));

  return await axios
    .post(`${url}/update-card`, formData, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const getPointConfig = async () => {
  return await axios
    .get(`${url}/get-point-config`, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};

export const updatePointConfig = async (data) => {
  return await axios
    .post(`${url}/update-point-coinfig`, data, {
      headers: { Authorization: `${getAccessToken()}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });
};
