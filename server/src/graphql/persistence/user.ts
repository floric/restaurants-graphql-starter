export type PersistedUser = {
  id: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
};

export const fetchUserById = (userId: string) => {
  const user: PersistedUser = {
    id: userId,
    firstName: "Florian",
    lastName: "Richter",
    registrationDate: new Date()
  };
  return user;
};
