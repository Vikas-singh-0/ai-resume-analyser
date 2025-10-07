import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

function FileUploader({ onFileSelect }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      onFileSelect(file);
      setFile(file);
    },
    [file]
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop, multiple: false, maxSize: 20 * 1024 * 1024 });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3">
                <img className="size-10" src="/images/pdf.png" alt="pdf" />
                <p>{file.name}</p>
                <p className="">{file.size}</p>
              </div>
              <button className="p-2 cursor-pointer" onClick={(e) => setFile(null)}>
                <img src="/icons/cross.svg" className="w-4 h-4 "/>
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-lg text-gray-500">PDF (max file size 20mb)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
