import axios from "axios";
// import https from 'https';

const Api = axios.create();

Api.interceptors.request.use((req) => {
  const user = window.localStorage.getItem("jwt_access_token");
  if (user) {
    req.headers.Authorization = `Bearer ${user}`;
  }
  return req;
});

export const getAllUserData = () => Api.get(`/v1/users/`);
export const addNewUser = (userData) => Api.post(`/v1/users/`, userData);
export const updateUser = (id, userData) => Api.patch(`/v1/users/${id}`, userData);
export const deleteUser = (id) => Api.delete(`/v1/users/${id}`);

export const getAllCredentialData = () => Api.get(`/v1/credential/`);
export const addNewCredential = (credentialData) =>
  Api.post(`/v1/credential/addnew`, credentialData);
export const deleteCredential = (id) => Api.delete(`/v1/credential/${id}`);

export const createAccount = (data) => Api.post(`/v1/account/createDemo`, data);
export const registeCredential = (data) => Api.post(`/v1/account/registerAccount`, data);

export const getAllAccountData = () => Api.get(`/v1/account/`);
export const getCredentialDetail = (login) => Api.get(`/v1/credential/${login}`);
