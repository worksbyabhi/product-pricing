import React from "react";
import { HeaderWrapper, LogoutButton, MainNav, ProjectName } from "./styled";
import { useUserContext } from "../../../store/LoggedUserStore";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const { user, clearUser } = useUserContext();

  const logoutClickHandler = () => {
    fetch("/logout", {
      credentials: "include",
    })
      .then(() => {
        clearUser();
      })
      .catch(() => {
        clearUser();
      });
  };

  return (
    <HeaderWrapper>
      <ProjectName>Product Pricing</ProjectName>
      {user ? (
        <MainNav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/add-pricing"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add pricing
          </NavLink>
          <LogoutButton onClick={logoutClickHandler}>logout</LogoutButton>
        </MainNav>
      ) : null}
    </HeaderWrapper>
  );
};
