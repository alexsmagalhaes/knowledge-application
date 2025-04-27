export type PaginatedResponse<T> = {
    data: T[];
    count: number;
    limit: number;
  };
  
  export interface Stat {
    users: number;
    categories: number;
    articles: number;
  }
  