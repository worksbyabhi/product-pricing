import React, { useEffect, useState } from "react";
import { GridColumn, GridContainer } from "../../designSystem/grid";
import { Placeholder } from "../../designSystem/placeholder";
import {
  TableComponent,
  TableComponentHeaders,
} from "../../designSystem/table";
import { PricingRecord } from "../../models";
import { capitalizeFirstLetter, getUrl } from "../../utils/functions";

export const UserDashboard = () => {
  const [storeContent, setStoreContent] = useState<PricingRecord[]>([]);
  const [fetchError, setFetchError] = useState(false);

  const headers: TableComponentHeaders<PricingRecord>[] = [];
  if (storeContent[0]) {
    Object.keys(storeContent[0]).forEach((key) => {
      if (key === "storeId") {
        headers.push({
          label: "Store Id",
          accessor: key as keyof PricingRecord,
        });
      } else if (key === "productName") {
        headers.push({
          label: "Product name",
          accessor: key as keyof PricingRecord,
        });
      } else if (["sku", "price", "data"].includes(key)) {
        headers.push({
          label: capitalizeFirstLetter(key),
          accessor: key as keyof PricingRecord,
        });
      }
    });
  }

  useEffect(() => {
    fetch(getUrl("/api/v1/pricing"), {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid session");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setStoreContent(data);
        setFetchError(false);
      })
      .catch(() => {
        setFetchError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridContainer>
      <GridColumn>
        <Placeholder height="1rem" />
        <h1>Dashboard</h1>
        <Placeholder height="2rem" />
        {fetchError ? (
          "Could not load the data"
        ) : (
          <TableComponent source={storeContent} headers={headers} />
        )}
      </GridColumn>
    </GridContainer>
  );
};
