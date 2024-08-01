import React, { ChangeEvent, useState } from "react";
import { GridColumn, GridContainer } from "../../designSystem/grid";
import { Placeholder } from "../../designSystem/placeholder";
import { CsvTemplateDownload } from "./CsvTemplateDownload";
import { Button } from "../../designSystem/button";
import { PricingRecord } from "../../models";
import { CsvActionContainer, ErrorMessage } from "./styled";
import { DisplayUploadedContent } from "./DisplayUploadedContent";

export const AddPricing = () => {
  const [message, setMessage] = useState("");
  const [uploadContent, setUploadContent] = useState<PricingRecord[]>([]);

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",");
    const data: PricingRecord[] = [];
    console.log(lines.slice(1));

    lines.slice(1).forEach((line) => {
      if (line !== "") {
        const values = line.split(",");
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header.trim()] = values[index]?.trim() || "";
        });
        data.push(obj);
      }
    });
    return { headers, data };
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (file.type !== "text/csv") {
      setMessage("Please upload a valid CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        const { headers, data } = parseCSV(text);

        const expectedHeaders = [
          "storeId",
          "sku",
          "productName",
          "price",
          "date",
        ];
        if (
          headers.length !== expectedHeaders.length ||
          !headers.every(
            (header, index) => header.trim() === expectedHeaders[index]
          )
        ) {
          setMessage(
            "CSV format is incorrect. Expected headers: " +
              expectedHeaders.join(", ")
          );
          return;
        }
        if (data.length) {
          setMessage("");
          setUploadContent(data);
        } else {
          setMessage(
            "No valid entry found. Please upload a valid csv file to continue"
          );
        }
      }
    };

    reader.readAsText(file);
  };

  return (
    <GridContainer>
      <GridColumn>
        <Placeholder height="1rem" />
        <h1>Add Products pricing</h1>
      </GridColumn>
      <Placeholder height="1rem" />
      <CsvActionContainer>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <Button as="label" htmlFor="fileInput" className="custom-file-upload">
          Upload CSV
        </Button>
        <CsvTemplateDownload />
      </CsvActionContainer>
      <GridColumn>
        {message ? (
          <ErrorMessage>{message}</ErrorMessage>
        ) : (
          <DisplayUploadedContent data={uploadContent} />
        )}
      </GridColumn>
    </GridContainer>
  );
};
