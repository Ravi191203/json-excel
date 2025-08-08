import React from 'react';
import * as XLSX from 'xlsx';
import { flattenJSON } from '../utils/jsonUtils';

const ExportButton = ({ jsonData }) => {
  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    const addSheet = (data, sheetName) => {
      const rows = data.map((row) => flattenJSON(row));
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    };

    if (Array.isArray(jsonData)) {
      addSheet(jsonData, 'Sheet1');
    } else if (typeof jsonData === 'object') {
      Object.entries(jsonData).forEach(([key, val]) => {
        if (Array.isArray(val)) addSheet(val, key);
      });
    }

    XLSX.writeFile(wb, 'converted.xlsx');
  };

  return (
    <button onClick={handleExport} disabled={!jsonData}>
      Export to Excel
    </button>
  );
};

export default ExportButton;
