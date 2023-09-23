import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (errorr) => {
    return Promise.reject(error);
  }
);

export const getApiInstance = (token) => {
  axiosInstance.interceptors.request.use((request) => {
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  });
  return axiosInstance;
};