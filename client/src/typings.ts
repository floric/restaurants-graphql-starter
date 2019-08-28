export type PaginatedResponse<T> = {
  items: Array<T>;
};

export type Restaurant = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  averageRating: number | null;
  ratings: PaginatedResponse<Rating>;
  offers: PaginatedResponse<Offer>;
};

export type Rating = {
  id: string;
  title: string;
  description: string | null;
  value: number;
  creationDate: string;
  user: User;
};

export type User = {
  firstName: string;
  lastName: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
};
