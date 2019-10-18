/*eslint-disable*/
import axios from 'axios';
import React from 'react';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

export const ENVIRONMENT = 'local';

export const config = {
  headers: {
    Accept: 'application/json',
    Pragma: 'no-cache'
  }
};

export const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:8075'
});


export const redirectToError = () => <ErrorBoundary />;

export const getData = urlPath => axios.get(urlPath).catch(redirectToError);

export const getDataApi = urlPath => {
  if (ENVIRONMENT === 'local') {
    return axiosApiInstance.get(urlPath, config).catch(redirectToError);
  }
};
export const putDataApi = (urlPath, data) => {
  if (ENVIRONMENT === 'local') {
    return axiosApiInstance.put(urlPath, data, config).catch(redirectToError);
  }
};

export const postDataApi = (urlPath, data) => {
  if (ENVIRONMENT === 'local') {
    return axiosApiInstance.post(urlPath, data, config).catch(redirectToError);
  }
};
export const deleteDataApi = urlPath => {
  if (ENVIRONMENT === 'local') {
    return axiosApiInstance.delete(urlPath, config).catch(redirectToError);
  }
};