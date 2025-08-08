import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { unflattenJSON } from '../utils/jsonUtils';

const ExcelToJsonUploader = () => {
  const [jsonData, setJsonData] = useState({});

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });

      const result = {};
      workbook.SheetNames.forEach((sheetName) => {
        const ws = workbook.Sheets[sheetName];
        const raw = XLSX.utils.sheet_to_json(ws, { defval: null });

        // 🔁 Unflatten each row
        const unflattened = raw.map((row) => unflattenJSON(row));
        result[sheetName] = unflattened;
      });

      setJsonData(result);
    };
    reader.readAsBinaryString(file);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.json';
    link.click();
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Excel to JSON</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      {Object.keys(jsonData).length > 0 && (
        <div>
          <h3>Preview:</h3>
          <pre style={{
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: '#f0f0f0',
            padding: '10px'
          }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
          <button onClick={downloadJSON}>Download JSON</button>
        </div>
      )}
    </div>
  );
};

export default ExcelToJsonUploader;
