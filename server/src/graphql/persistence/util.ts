import { getDb } from "./db";

export type EntityType = "offer" | "rating" | "restaurant";

type DbEntity = {
  id: string;
};

export interface PaginatedReponse<T extends {}> {
  items: Array<T & DbEntity>;
  page: number;
  pageCount: number;
}

export const create = async <T extends {}>(
  elem: T,
  type: EntityType
): Promise<T & DbEntity> => {
  const { id, ok } = await getDb<T>().post({ type, ...elem });
  if (!ok) {
    throw new Error("Creating object failed");
  }

  return { id, ...elem };
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
  const { docs } = await getDb<T>().find({
    selector: { ...(selector || {}), type },
    limit: count,
    skip: page * count
  });

  return {
    items: docs.map(n => ({
      id: n._id,
      ...n
    })),
    page,
    pageCount: count
  };
};

export const getById: <T extends {}>(
  id: string
) => Promise<(T & DbEntity) | null> = async <T>(id: string) => {
  try {
    return getDb<T>().get(id);
  } catch (err) {
    return null;
  }
};
