import React from 'react';

const UploadArea = ({ setJsonData }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setJsonData(data);
        } catch (err) {
          alert('Invalid JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div
  className="dropzone"
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
>
  <p>Drag & drop a JSON file or click to upload</p>
  <input type="file" accept=".json" onChange={handleFile} />
</div>
  );
};

export default UploadArea;
