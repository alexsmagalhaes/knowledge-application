import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient } from "../types/http-request";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const session = Cookies.get("session");

  try {
    const parsed = JSON.parse(session || "{}");

    if (
      parsed.token &&
      config.headers &&
      config.headers["Requires-Auth"] !== false
    ) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  } catch (e) {
    console.warn("Session cookie inválido.");
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      return Promise.reject({ status, message: data });
    }

    return Promise.reject({
      status: 0,
      message: "Erro de conexão. Verifique sua internet e tente novamente.",
    });
  }
);

const axiosClient: HttpClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.get(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.post(url, body, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.put(url, body, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return res.data;
  },
};

export const httpClient: HttpClient = axiosClient;
