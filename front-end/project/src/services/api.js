import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8888';
const TIME_OUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

const token = localStorage.getItem('token') ?? '';

export const createAPI = (onUnauthorized, onRedirect) => {
  const api = axios.create({
    //withCredentials: true, для передачи сессионных cookies
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const { response } = err;
    if (response?.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }
    if (response?.status === HttpCode.NOT_FOUND) {
      onRedirect();
    }
    throw err;
  };
  //перехватчик, посредник - предварительная обработка

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
