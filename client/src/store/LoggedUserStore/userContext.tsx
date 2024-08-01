import React, { createContext } from "react";
import { UserContextType } from "./type";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
