import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('smartpot.db');

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      fullName TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      diet TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS user_ingredients (
      userId TEXT NOT NULL,
      ingredientId TEXT NOT NULL,
      quantity REAL,
      unit TEXT,
      PRIMARY KEY (userId, ingredientId),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (ingredientId) REFERENCES ingredients(id)
    );
  `);
};

export default db;
