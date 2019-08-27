import { getDb } from "./db";

export type EntityType = "offer" | "rating" | "restaurant" | "user";

export type DbEntity = {
  id: string;
  creationDate: Date;
};

export interface PaginatedReponse<T extends {}> {
  items: Array<T & DbEntity>;
  page: number;
  pageSize: number;
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
  const items = docs.map(n => ({
    ...n,
    id: n._id,
    creationDate: new Date(n.creationDate)
  }));

  return {
    items,
    page,
    pageSize: items.length
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
