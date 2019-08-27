import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import { createRating } from "./ratings";
import { createRestaurant } from "./restaurants";
import { createUser } from "./user";
import { logger } from "../../utils/logger";
import { createOffer } from "./offer";

const DB_NAME = "localDB";

PouchDB.plugin(PouchDBFind);

const db = new PouchDB<any>(DB_NAME);

const createTestdata = async () => {
  const [, chief, guest, remy, winston] = await Promise.all([
    createUser({ userName: "admin", firstName: "The", lastName: "Root" }),
    createUser({
      firstName: "Skinner",
      lastName: "Chief",
      userName: "skinner"
    }),
    createUser({
      firstName: "Anton",
      lastName: "Ego",
      userName: "anton"
    }),
    createUser({
      firstName: "Remy",
      lastName: "Cook",
      userName: "remy"
    }),
    createUser({
      firstName: "Winston",
      lastName: "Smith",
      userName: "winston"
    })
  ]);
  const [mainRestaurant, ratatouilleRestaurant] = await Promise.all([
    createRestaurant({
      title: "Auguste's Gusteau",
      userId: chief.id,
      description: "Best french restaurant in Paris."
    }),
    createRestaurant({
      title: "La Ratatouille",
      userId: remy.id,
      description: "Just serving Ratatouille, nothing special at all."
    })
  ]);
  await Promise.all([
    createRating({
      title: "Horrible place",
      description:
        "Should be famous for its exquisite food, but unfortunately not as good as expected. The staff is unfriendly und there seem to be rats in the kitchen...",
      value: 2,
      userId: guest.id,
      restaurantId: mainRestaurant.id
    }),
    createRating({
      title: "Expensive and overhyped",
      description:
        "In general the location is quite nice. The food was ok, but could have been more salty. But the pricing is far beyond good and evil.",
      value: 3,
      userId: winston.id,
      restaurantId: mainRestaurant.id
    }),
    createRating({
      title: "Feeling like home",
      description:
        "When I sat there, I felt like 30 years ago at home. Ratatouille at its best.",
      value: 5,
      userId: guest.id,
      restaurantId: ratatouilleRestaurant.id
    })
  ]);
  await createOffer({
    title: "Pay twice as much",
    description:
      "If you pay twice as much, you will get an extraordinary view of the Tour Eiffel.",
    restaurantId: mainRestaurant.id,
    userId: chief.id
  });

  logger.info("Created awesome test data successfully.");
};

const initDb = async () => {
  await db.createIndex({
    index: { name: "restaurantId", fields: ["restaurantId"] }
  });

  await createTestdata();
};

initDb();

export const getDb: <T>() => PouchDB.Database<T> = () => {
  return db;
};
