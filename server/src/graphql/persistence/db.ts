import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import { create } from "./util";
import { PersistedUser, createUser } from "./user";
import { PersistedRestaurant, createRestaurant } from "./restaurants";
import { PersistedRating, createRating } from "./ratings";

const DB_NAME = "localDB";

PouchDB.plugin(PouchDBFind);

const db = new PouchDB<any>(DB_NAME);

const initDb = async () => {
  await db.createIndex({
    index: { name: "restaurantId", fields: ["restaurantId"] }
  });
  await createUser({ userName: "admin", firstName: "The", lastName: "Root" });
  const chief = await createUser({
    firstName: "Skinner",
    lastName: "Chief",
    userName: "skinner"
  });
  const criticalGuest = await createUser({
    firstName: "Anton",
    lastName: "Ego",
    userName: "anton"
  });
  const mainRestaurant = await createRestaurant({
    title: "Auguste's Gusteau",
    userId: chief.id,
    description: "Best french restaurant in Paris."
  });
  await createRating({
    title: "Horrible place",
    description:
      "Should be famous for its exquisite food, but unfortunately not as good as expected. The staff is unfriendly und there seem to be rats in the kitchen...",
    value: 2,
    userId: criticalGuest.id,
    restaurantId: mainRestaurant.id
  });
};

initDb();

export const getDb: <T>() => PouchDB.Database<T> = () => {
  return db;
};
