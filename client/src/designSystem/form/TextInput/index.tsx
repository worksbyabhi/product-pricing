import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { StyledFieldWrapper } from "../FieldWrapper";
import { StyledTextInput } from "./styled";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  onChangeHandler: (value: string) => void;
}

export const TextInput = (props: TextInputProps) => {
  const { label, id, onChangeHandler, ...rest } = props;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChangeHandler(event.target.value);
  };

  return (
    <StyledFieldWrapper>
      <label htmlFor={id}>{label}</label>
      <StyledTextInput id={id} {...rest} onChange={inputChangeHandler} />
    </StyledFieldWrapper>
  );
};
