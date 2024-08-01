import React, { FormEvent, useState } from "react";
import {
  ErrorMessage,
  StyledLoginContainer,
  StyledLoginWrapper,
} from "./styled";
import { TextInput } from "../../designSystem/form";
import { Button } from "../../designSystem/button";
import { getUrl } from "../../utils/functions/getUrl";
import { useUserContext } from "../../store/LoggedUserStore";

export const LoginComponent = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { updateUser } = useUserContext();

  const loginFormSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(getUrl("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data.username && data.role) {
          updateUser(data);
        }
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  return (
    <StyledLoginWrapper>
      <StyledLoginContainer onSubmit={loginFormSubmitHandler}>
        <h1>Login</h1>
        <TextInput
          id="username"
          label="Username"
          onChangeHandler={setUserName}
          required
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          onChangeHandler={setPassword}
          required
        />
        <ErrorMessage>{loginError ? "Invalid credentials" : ""}</ErrorMessage>
        <Button type="submit">Submit</Button>
      </StyledLoginContainer>
    </StyledLoginWrapper>
  );
};
