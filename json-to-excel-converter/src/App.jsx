import React, { useState } from 'react';
import UploadArea from './components/UploadArea';
import JsonEditor from './components/JsonEditor';
import PreviewTable from './components/PreviewTable';
import ExportButton from './components/ExportButton';
import ExcelToJsonUploader from './components/ExcelToJsonUploader'; // ⬅️ Import this

const App = () => {
  const [jsonData, setJsonData] = useState([]);

  return (
    <div className="container">
      <h1>JSON ⇄ Excel Converter</h1>
  
      <h2>🔁 JSON to Excel</h2>
      <UploadArea setJsonData={setJsonData} />
      <JsonEditor setJsonData={setJsonData} />
      <PreviewTable data={jsonData} />
      <ExportButton jsonData={jsonData} />
  
      <hr style={{ margin: '30px 0' }} />
  
      <ExcelToJsonUploader />
    </div>
  );
  
};

export default App;
