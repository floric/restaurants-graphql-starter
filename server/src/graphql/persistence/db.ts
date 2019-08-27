import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

const DB_NAME = "localDB";

PouchDB.plugin(PouchDBFind);

const db = new PouchDB<any>(DB_NAME);
db.createIndex({ index: { name: "restaurantId", fields: ["restaurantId"] } });

export const getDb: <T>() => PouchDB.Database<T> = () => {
  return db;
};
