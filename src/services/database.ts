import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('smartpot.db');

export const initDB = () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;
  `);

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
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity REAL,
      unit TEXT,
      image TEXT,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
    db.execSync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER NOT NULL,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      image TEXT,
      usedIngredients TEXT,
      missedIngredients TEXT,
      PRIMARY KEY (id, userId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
};

export default db;
