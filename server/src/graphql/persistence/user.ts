import { getById, DbEntity, create } from "./util";

export type PersistedUser = {
  userName: string;
  firstName: string;
  lastName: string;
} & DbEntity;

export const fetchUserById = (userId: string) => getById<PersistedUser>(userId);

type CreateRestaurantArgs = {
  userName: string;
  firstName: string;
  lastName: string;
};

export const createUser = ({
  userName,
  firstName,
  lastName
}: CreateRestaurantArgs) =>
  create<PersistedUser>(
    {
      firstName,
      lastName,
      userName
    },
    "user"
  );
