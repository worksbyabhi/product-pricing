import React, { useState } from "react";
import { PricingRecord } from "../../models";
import {
  TableComponent,
  TableComponentHeaders,
} from "../../designSystem/table";
import { capitalizeFirstLetter, getUrl } from "../../utils/functions";
import { Button } from "../../designSystem/button";
import { Placeholder } from "../../designSystem/placeholder";
import { ErrorMessage } from "./styled";

export interface DisplayUploadedContentProps {
  data: PricingRecord[];
}

export const DisplayUploadedContent = (props: DisplayUploadedContentProps) => {
  const [saveError, setSaveError] = useState(false);
  const { data } = props;

  if (data.length) {
    const headers: TableComponentHeaders<PricingRecord>[] = Object.keys(
      data[0]
    ).map((key) => {
      if (key === "storeId") {
        return { label: "Store Id", accessor: key as keyof PricingRecord };
      } else if (key === "productName") {
        return { label: "Product name", accessor: key as keyof PricingRecord };
      }
      return {
        label: capitalizeFirstLetter(key),
        accessor: key as keyof PricingRecord,
      };
    });

    const dataSaveHandler = () => {
      setSaveError(false);
      fetch(getUrl("/api/v1/pricing/upload"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to save");
          }
        })
        .catch((e) => {
          console.log(e);
          setSaveError(true);
        });
    };

    return (
      <>
        <TableComponent source={data} headers={headers} />
        <Placeholder height="1rem" />
        {saveError ? (
          <>
            <ErrorMessage>
              Could not save the data. Please try again.
            </ErrorMessage>
            <Placeholder height="1rem" />
          </>
        ) : null}
        <Button onClick={dataSaveHandler}>Save</Button>
      </>
    );
  }

  return <p>Please upload a valid csv file to continue</p>;
};
