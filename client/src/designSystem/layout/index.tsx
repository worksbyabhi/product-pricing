import React, { ReactNode } from "react";
import { GridContainer } from "../grid";
import { Header } from "./Header";

export const LayoutComponent = (props: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <GridContainer $isRootParent>{props.children}</GridContainer>
    </>
  );
};
