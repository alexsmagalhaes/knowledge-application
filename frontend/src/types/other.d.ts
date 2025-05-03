type PaginatedResponse<T> = {
    data: T[];
    count: number;
    limit: number;
  };
  
interface Stat {
    users: number;
    categories: number;
    articles: number;
  }
  