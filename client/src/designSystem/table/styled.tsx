import styled from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid ${(props) => props.theme.colors.primary};
  width: 100%;

  tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }

  th,
  td {
    padding: 4px 8px;
  }

  th {
    text-align: left;
  }
`;
