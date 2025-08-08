import React from 'react';
import { flattenJSON } from '../utils/jsonUtils';

const PreviewTable = ({ data }) => {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  const rows = Array.isArray(data) ? data : Object.values(data).flat();
  const flatRows = rows.map((row) => flattenJSON(row));
  const headers = Array.from(new Set(flatRows.flatMap((row) => Object.keys(row))));

  return (
    <table border="1" style={{ marginBottom: '10px', width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
      </thead>
      <tbody>
        {flatRows.map((row, i) => (
          <tr key={i}>
            {headers.map((header) => (
              <td key={header}>{row[header] ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PreviewTable;
