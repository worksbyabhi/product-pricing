"use client";

import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";
import GlobalStyle from "./GlobalStyle";
import { theme } from ".";

export default function ThemeWrapper(props: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  );
}
