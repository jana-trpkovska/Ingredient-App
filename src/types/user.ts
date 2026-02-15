import { Ingredient } from './ingredient';

export interface User {
  id: string;
  fullName: string;
  username: string;
  password: string;
  diet?: string;
  ingredients?: Ingredient[];
}
