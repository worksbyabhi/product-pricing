import React, { ReactNode } from "react";
import { StyledTable } from "./styled";

export interface TableComponentHeaders<T> {
  label: string;
  accessor: keyof T;
}

export interface TableComponentProps<T> {
  source: T[];
  headers: TableComponentHeaders<T>[];
}

export const TableComponent = <T extends Object>(
  props: TableComponentProps<T>
) => {
  const { source, headers } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {source.map((item, index) => (
          <tr key={`row-${index}`}>
            {headers.map((header, index) => (
              <td key={`row-column-${index}`}>
                {item[header.accessor] as ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};
