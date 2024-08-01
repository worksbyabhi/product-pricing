import styled from "styled-components";
import { GridColumn } from "../../designSystem/grid";

export const StyledLoginWrapper = styled(GridColumn)`
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const StyledLoginContainer = styled.form`
  width: 340px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 12px;
  height: 12px;
`;
