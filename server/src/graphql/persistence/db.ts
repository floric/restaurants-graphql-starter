import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

const db = new PouchDB<any>("localDB");
db.createIndex({ index: { name: "restaurantId", fields: ["restaurantId"] } });

export const getDb: <T>() => PouchDB.Database<T> = () => {
  return db;
};
