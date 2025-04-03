export type PaginatedResponse<T> = {
  data: T[];
  count: number;
  limit: number;
};
