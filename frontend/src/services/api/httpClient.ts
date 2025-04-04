import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError, handleError, HttpClient } from "./httpClient.type";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const axiosClient: HttpClient = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | ApiError> => {
    try {
      const res: AxiosResponse<T> = await axiosInstance.get(url, config);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  post: async <T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T | ApiError> => {
    try {
      const res: AxiosResponse<T> = await axiosInstance.post(url, body, config);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  put: async <T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<T | ApiError> => {
    try {
      const res: AxiosResponse<T> = await axiosInstance.put(url, body, config);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | ApiError> => {
    try {
      const res: AxiosResponse<T> = await axiosInstance.delete(url, config);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export const httpClient: HttpClient = axiosClient;
