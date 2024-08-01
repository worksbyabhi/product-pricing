import styled from "styled-components";
import { GridColumn } from "../../designSystem/grid";

export const CsvActionContainer = styled(GridColumn)`
  flex-direction: row;
  gap: 2rem;
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
`;
