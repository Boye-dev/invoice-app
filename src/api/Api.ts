import axios from "axios";
import {
  getDecodedJwt,
  getRefreshToken,
  getToken,
  removeToken,
  setToken,
} from "./Auth";

export const baseURL = import.meta.env.VITE_API_BASE_URL;
const Api = axios.create({
  baseURL,
});

Api.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config };
    if (!updatedConfig.headers.noBearerToken) {
      updatedConfig.headers.Authorization = `Bearer ${getToken()}`;
    }
    delete updatedConfig.headers.noBearerToken;
    return updatedConfig;
  },
  (error: any) => Promise.reject(error)
);

Api.interceptors.request.use(
  async (config) => {
    const updatedConfig = { ...config };
    const decodeToken = getDecodedJwt();
    if (!decodeToken?.exp) {
      return config;
    }
    if (decodeToken.exp * 1000 < Date.now()) {
      const response = await axios.post(`${baseURL}/users/refresh`, {
        token: getRefreshToken(),
      });
      if (!response.data) {
        return config;
      }
      setToken(response.data.data.accessToken);
      updatedConfig.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
    }
    return updatedConfig;
  },
  (error: any) => Promise.reject(error)
);

Api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error?.response?.data?.message === "Unauthorized" ||
      error?.response?.data?.error === "Invalid Token" ||
      error?.response?.data?.error === "JsonWebTokenError" ||
      error?.response?.data?.error === "TokenExpiredError"
    ) {
      removeToken();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export default Api;
