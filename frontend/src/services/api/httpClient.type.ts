export interface HttpClient {
  get: <T = any>(url: string, config?: any) => Promise<T | ApiError>;
  post: <T = any>(
    url: string,
    body?: any,
    config?: any
  ) => Promise<T | ApiError>;
  put: <T = any>(
    url: string,
    body?: any,
    config?: any
  ) => Promise<T | ApiError>;
  delete: <T = any>(url: string, config?: any) => Promise<T | ApiError>;
}

export interface ApiError {
  status: number;
  message: string;
}

export const handleError = (error: any): ApiError => {
  return {
    status: error.response?.status || 500,
    message: error.response?.data?.message || "Unexpected error",
  };
};
