export interface PaginatedReponse<T> {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
}
