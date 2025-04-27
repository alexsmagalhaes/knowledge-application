import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export function setupInterceptors(axiosInstance: AxiosInstance) {
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
}
