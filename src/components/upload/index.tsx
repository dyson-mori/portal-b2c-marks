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
  isLoading: boolean;
  productId?: string | null;
  setFiles: (f: File[]) => void;
};

const Upload: React.FC<UploadProps> = ({ isUpdate, files, isLoading, productId, setFiles }) => {
  console.log(productId);

  const [multiFiles, setMultiFiles] = useState([] as UploadFileProps[]);

  const styles = {
    opacity: isLoading ? 0.5 : 1,
    cursor: isLoading ? 'default' : 'pointer'
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

    // setFiles(x.map(e => e.file));
    setMultiFiles(x);
  };

  // useEffect(() => {
  //   if (!isLoading && !isUpdate) {
  //     setMultiFiles([]);
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  //   return setMultiFiles(files);
  // }, [files]);

  useEffect(() => {
    // if (!isUpdate) {
    //   setFiles(multiFiles);
    // }
    setFiles(multiFiles.map(e => e.file));
  }, [multiFiles]);

  useEffect(() => {
    if (!!productId) {
      (async () => {
        const formData = new FormData();

        formData.append("product_id", productId);
        // formData.append("files", JSON.stringify(files));
        formData.append("code", `${parseInt(String(Math.random() * 1000))}`);

        multiFiles.forEach((file: any, i) => {
          formData.append(`file${i+1}`, file);
        });

        const file = await fetch('/api/files', {
          method: isUpdate ? 'PUT' : 'POST',
          body: formData
        });

        const result = await file.json();

        console.log(result);

        // if (!file.ok) {
        //   setLoadingForm(false);
        //   return setNotification({ icon: Warning, type: 'failed', message: 'Failed to send the files', active: `${Math.random()}_show` });
        // };
      })()
    }
  }, [productId])

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
        disabled={isLoading}
        multiple
      />
    </Container>
  )
}

export {
  Upload,
  type UploadFileProps
}