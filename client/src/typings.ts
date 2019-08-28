export type PaginatedResponse<T> = {
  items: Array<T>;
};

export type Restaurant = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  averageRating: number | null;
};
