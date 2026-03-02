import { Diet } from "./diet";

export interface User {
  id: string;
  fullName: string;
  username: string;
  password: string;
  diet?: Diet;
}
