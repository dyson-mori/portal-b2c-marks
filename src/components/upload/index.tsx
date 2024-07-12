"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Container, MultiFiles } from './styles';

import Add from '@/assets/svg/add.svg';

type UploadFileProps = {
  file: File;
  preview: string;
}

interface UploadProps {
  uploading: boolean;
  setFile: (UploadFile: UploadFileProps[]) => void;
}

const Upload: React.FC<UploadProps> = ({ uploading, setFile }) => {
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
            preview: readerEvent.target.result
          };

          setMultiFiles(prev => [...prev, file]);
          setFile(prev => [...prev, file]);
        };
      };
    };

    // setLoadingFile('have');
  };

  const handleRemoveImage = (i: number) => {
    const x = multiFiles.filter((item, index) => index !== i && item)

    setFile(x);
    setMultiFiles(x);
  };

  useEffect(() => {
    if (!uploading) {
      // setPreview(null);
      // setLoadingFile('empty');
      setMultiFiles([]);
    };
  }, [uploading]);

  return (
    <Container>
      <MultiFiles>
        {
          multiFiles.map(({ preview }, index) => (
            <label style={styles} key={index} onClick={() => handleRemoveImage(index)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id='img' src={preview!} alt="img" />
            </label>
          ))
        }
        {
          Array.from({ length: (9 - multiFiles.length) }).map((_, index) => (
            <label htmlFor="file" key={index}>
              <Image src={Add} width={20} height={20} alt='add.svg' />
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