"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { FilesProps } from '@/global/interfaces';
import { Add } from '@/assets/svg/icons';

import { Container, MultiFiles } from './styles';

type UploadFileProps = {
  file: File;
  url: string;
}

interface UploadProps {
  isUpdate: boolean;
  files?: FilesProps[];
  uploading: boolean;
  setFiles: (f: File[]) => void;
};

const Upload: React.FC<UploadProps> = ({ isUpdate, files, uploading, setFiles }) => {
  const [multiFiles, setMultiFiles] = useState([] as UploadFileProps[]);

  const styles = {
    opacity: uploading ? 0.5 : 1,
    cursor: uploading ? 'default' : 'pointer'
  };

  const handleFileChange = (evt: any) => {
    const selectedFile = evt.target.files as File[];

    for (const key in selectedFile) {
      if (Object.prototype.hasOwnProperty.call(selectedFile, key)) {
        const reader = new FileReader();
        const element = selectedFile[key];

        if (element) reader.readAsDataURL(element);

        reader.onload = (readerEvent: any) => {
          const file = {
            file: element,
            url: readerEvent.target.result
          };

          setMultiFiles(prev => [...prev, file]);
        };
      };
    };

    // setLoadingFile('have');
  };

  const handleRemoveImage = (i: number) => {
    const x = multiFiles.filter((item, index) => index !== i && item)

    setFiles(x.map(e => e.file));
    setMultiFiles(x);
  };

  useEffect(() => {
    if (!uploading && !isUpdate) {
      setMultiFiles([]);
    }
  }, [uploading]);

  useEffect(() => {
    return setMultiFiles(files);
  }, [files]);

  useEffect(() => {
    setFiles(multiFiles.map(e => e.file));
  }, [multiFiles]);

  return (
    <Container>
      <MultiFiles>
        {
          multiFiles?.map((file, index) => (
            <label style={styles} key={index} onClick={() => handleRemoveImage(index)}>
              <Image width={400 / 3.1} height={400 / 3.1} src={file?.url} alt="img" style={{ objectFit: 'cover' }} />
            </label>
          ))
        }
        {
          Array.from({ length: (9 - multiFiles?.length) }).map((_, index) => (
            <label htmlFor="file" key={index}>
              <Add width={25} height={50} stroke='#292D32' strokeWidth={1.5} />
            </label>
          ))
        }
      </MultiFiles>

      <input
        id="file"
        type="file"
        name='file'
        onChange={handleFileChange}
        disabled={uploading}
        multiple
      />
    </Container>
  )
}

export {
  Upload,
  type UploadFileProps
}