import React from "react";
import { Button } from "../../designSystem/button";

export const CsvTemplateDownload = () => {
  const csvTemplateDownloadHandler = () => {
    const headers = ["storeId", "sku", "productName", "price", "date"];
    const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pricing_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={csvTemplateDownloadHandler}>Download template</Button>
  );
};
