import { User } from "../../models/user";

export interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}
