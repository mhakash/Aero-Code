import React, { useEffect, useRef, useState } from 'react';

const Upload = ({ className = '', fill = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill={fill}
        d="M398.1 233.2c0-1.2.2-2.4.2-3.6 0-65-51.8-117.6-115.7-117.6-46.1 0-85.7 27.4-104.3 67-8.1-4.1-17.2-6.5-26.8-6.5-29.5 0-54.1 21.9-58.8 50.5C57.3 235.2 32 269.1 32 309c0 50.2 40.1 91 89.5 91H224v-80h-48.2l80.2-83.7 80.2 83.6H288v80h110.3c45.2 0 81.7-37.5 81.7-83.4 0-45.9-36.7-83.2-81.9-83.3z"
      />
    </svg>
  );
};

const FilePicker: React.FC<{ file: any; setFile: any }> = ({ setFile, file }) => {
  const handleDragEvent = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files = [...e.dataTransfer.files];
    console.log(files);
    setFile(files);
  };

  return (
    <div
      className=""
      onDragOver={(e) => handleDragEvent(e)}
      onDragEnter={(e) => handleDragEvent(e)}
      onDragLeave={(e) => handleDragEvent(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <label>
        <input
          type="file"
          className="hidden"
          multiple={false}
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <div className="w-96 h-48 rounded-md max-w-full flex flex-col justify-center items-center m-auto border-gray-800 border  cursor-pointer">
          <Upload className="w-16 h-16" fill="rgb(55, 65, 81)" />
          <div>click / drag</div>
        </div>
      </label>
    </div>
  );
};

export default FilePicker;
