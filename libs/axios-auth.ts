import axios from "axios";
import Router from "next/router";

import { getUserToken, removeUserToken } from "helpers/user-token";

const axiosAuth = axios.create();
// Add a request interceptor
axiosAuth.interceptors.request.use(function (config) {
  // Do something before request is sent
  const access_token = getUserToken();
  config.headers.Authorization =  access_token ? `Bearer ${access_token}` : '';
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosAuth.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  // console.log('interceptor error', error.response)
  if(error.response.status === 401){ // unauthorized
    Router.push('/');
    localStorage.removeItem("villageibookAccount");
    removeUserToken();
  }
  return Promise.reject(error);
});

export default axiosAuth;