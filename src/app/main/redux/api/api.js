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

export const getAllUserData = () => Api.get(`/v1/users`);
export const addNewUser = (userData) => Api.post(`/v1/users/`, userData);
export const updateUser = (id, userData) => Api.patch(`/v1/users/${id}`, userData);
export const deleteUser = (id) => Api.delete(`/v1/users/${id}`);
