export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  [key: string]: any;
}

export interface HttpClient {
  get<T = any>(url: string, config?: HttpRequestConfig): Promise<T>;

  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T>;

  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpRequestConfig
  ): Promise<T>;

  delete<T = any>(url: string, config?: HttpRequestConfig): Promise<T>;
}

export interface HttpRequestError {
  status: number;
  message: string;
}

export const handleError = (error: any): HttpRequestError => {
  return {
    status: error.response?.status || 500,
    message: error.response?.data || "Unexpected error",
  };
};
