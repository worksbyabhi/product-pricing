import React, { ReactNode } from "react";
import { UserContextProvider } from "./LoggedUserStore";

export const Store = (props: { children: ReactNode }) => {
  return <UserContextProvider>{props.children}</UserContextProvider>;
};
