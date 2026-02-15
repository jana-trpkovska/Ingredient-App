import db from './database';
import { User } from '../types/user';

export const addUser = (user: User) => {
  try {
    db.runSync(
      `INSERT INTO users (id, fullName, username, password, diet)
       VALUES (?, ?, ?, ?, ?)`,
      [
        user.id,
        user.fullName,
        user.username,
        user.password,
        user.diet ?? null,
      ]
    );
  } catch (error) {
    console.log('Error adding user:', error);
    throw error;
  }
};

export const getUsers = (): User[] => {
  try {
    const result = db.getAllSync<User>(`SELECT * FROM users`);
    return result;
  } catch (error) {
    console.log('Error getting users:', error);
    return [];
  }
};

export const getUserByUsername = (username: string): User | undefined => {
  try {
    const result = db.getFirstSync<User>(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    return result ?? undefined;
  } catch (error) {
    console.log('Error getting user:', error);
    return undefined;
  }
};

export const updateUser = (user: User) => {
  try {
    db.runSync(
      `UPDATE users 
       SET fullName = ?, diet = ?
       WHERE id = ?`,
      [user.fullName, user.diet ?? null, user.id]
    );
  } catch (error) {
    console.log('Error updating user:', error);
    throw error;
  }
};