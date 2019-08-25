import { getById } from "./util";

export type PersistedUser = {
  id: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
};

export const fetchUserById = (userId: string) => getById<PersistedUser>(userId);
