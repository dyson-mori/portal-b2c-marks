"use client"

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { FilesProps } from '@/global/interfaces';
import { Add, Warning } from '@/assets/svg/icons';

import { Container, MultiFiles } from './styles';
import { NotificationContext } from '@/hooks/notification';

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
  const { setNotification } = useContext(NotificationContext);

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
    setFiles(multiFiles.map(e => e.file));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiFiles]);

  useEffect(() => {
    if (!!productId) {
      (async () => {
        const formData = new FormData();

        formData.append("product_id", productId);
        // formData.append("files", JSON.stringify(files));
        formData.append("code", `${parseInt(String(Math.random() * 1000))}`);

        multiFiles.forEach((file, i) => {
          formData.append(`file${i+1}`, file.file);
        });

        const file = await fetch('/api/files', {
          method: isUpdate ? 'PUT' : 'POST',
          body: formData
        });

        if (!file.ok) {
          return setNotification({ icon: Warning, type: 'failed', message: 'Failed to send the files', active: `${Math.random()}_show` });
        };
        setMultiFiles([]);
        setFiles([]);
        return setNotification({ icon: Warning, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
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