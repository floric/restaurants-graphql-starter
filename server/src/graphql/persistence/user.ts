import { getById, DbEntity, create } from "./util";

export type PersistedUser = {
  userName: string;
  firstName: string;
  lastName: string;
} & DbEntity;

export const fetchUserById = async (userId: string) => {
  if (userId === SYSTEM_USER.id) {
    return SYSTEM_USER;
  }

  return await getById<PersistedUser>(userId);
};

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

export const SYSTEM_USER: PersistedUser = {
  userName: "system",
  firstName: "Super",
  lastName: "User",
  creationDate: new Date(),
  id: "system"
};
