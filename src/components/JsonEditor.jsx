import React, { useState } from 'react';

const JsonEditor = ({ setJsonData }) => {
  const [jsonText, setJsonText] = useState('');

  const handleChange = (e) => {
    setJsonText(e.target.value);
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonData(parsed);
    } catch (err) {
      alert('Invalid JSON: ' + err.message);
    }
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <textarea
        placeholder="Paste JSON here..."
        rows="10"
        cols="80"
        value={jsonText}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleApply}>Apply JSON</button>
    </div>
  );
};

export default JsonEditor;
