import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

const DB_NAME = "localDB";

PouchDB.plugin(PouchDBFind);

const db = new PouchDB<any>(DB_NAME);
db.createIndex({ index: { name: "restaurantId", fields: ["restaurantId"] } });

const getDb: <T>() => PouchDB.Database<T> = () => {
  return db;
};

export type EntityType = "offer" | "rating" | "restaurant" | "user";

export type DbEntity = {
  id: string;
  creationDate: Date;
};

export interface PaginatedReponse<T extends {}> {
  items: Array<T & DbEntity>;
  page: number;
  pageCount: number;
}

export const create = async <T extends {}>(
  elem: Omit<T, keyof DbEntity>,
  type: EntityType
) => {
  const creationDate = new Date();
  const { id, ok } = await getDb().post({
    ...elem,
    type,
    creationDate: creationDate.toUTCString()
  });
  if (!ok) {
    throw new Error("Creating object failed");
  }

  return { ...elem, id, creationDate };
};

type PaginationOptions = {
  type: EntityType;
  count?: number;
  page?: number;
  selector?: PouchDB.Find.Selector;
};

export const findPaginated = async <T extends {}>(
  options: PaginationOptions
) => {
  const { type, selector, count = 20, page = 0 } = options;
  const { docs } = await getDb<T & DbEntity>().find({
    selector: { ...(selector || {}), type },
    limit: count,
    skip: page * count
  });

  return {
    items: docs.map(n => ({
      ...n,
      id: n._id,
      creationDate: new Date(n.creationDate)
    })),
    page,
    pageCount: count
  };
};

export const getById: <T extends {}>(
  id: string
) => Promise<(T & DbEntity) | null> = async <T>(id: string) => {
  try {
    const result = await getDb<T & DbEntity>().get(id);
    return {
      ...result,
      id: result._id,
      creationDate: new Date(result.creationDate)
    };
  } catch (err) {
    return null;
  }
};
