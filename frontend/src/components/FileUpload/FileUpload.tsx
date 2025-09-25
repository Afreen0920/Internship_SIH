import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file.name);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Your Resume</h2>
      <div className="input-group mb-3">
        <input type="file" className="form-control" onChange={handleFileChange} />
        <button className="btn btn-primary" type="button" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default FileUpload;
