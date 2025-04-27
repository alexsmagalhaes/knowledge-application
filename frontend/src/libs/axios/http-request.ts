import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient } from "./http-request.type";
import { setupInterceptors } from "./http-interceptions";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

setupInterceptors(axiosInstance);

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
