"use client"

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Files } from '@prisma/client';

import { FilesProps } from '@/global/interfaces';
import { Add, Block, Success, Warning } from '@/assets/svg/icons';

import { Container, MultiFiles } from './styles';
import { NotificationContext } from '@/hooks/notification';

type UploadFileProps = {
  file?: File;
  url?: string;
  refile?: Files
}

interface UploadProps {
  isUpdate: boolean;
  files?: FilesProps[];
  isLoading: boolean;
  productId?: string | null;
  setFiles: (f: any) => void;
  // setFiles: (f: File[]) => void;
  isSubmitting: boolean;
};

const Upload: React.FC<UploadProps> = ({ isUpdate, files, isLoading, productId, setFiles, isSubmitting }) => {
  const { setNotification } = useContext(NotificationContext);
  // console.log(files);

  const [uploading, setUploading] = useState([] as UploadFileProps[]);
  // console.log(uploading);
  // const [reuploading, setReuploading] = useState([] as Files[]);

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
          setUploading(prev => [...prev, file]);
        };
      };
    };

    // setLoadingFile('have');
  };

  const handleRemoveImage = (i: number) => {
    const x = uploading.filter((item, index) => index !== i && item)
    setUploading(x);
  };

  useEffect(() => {
    setFiles(uploading.map(e => e.file));
  }, [uploading]);

  useEffect(() => {
    setUploading(files!.map(e => ({
      url: e.url,
      refile: e
    })));
  }, []);

  console.log(productId && isSubmitting);

  useEffect(() => {
    if (productId) {
      (async () => {
        const formData = new FormData();

        formData.append("product_id", productId);
        // formData.append("files", JSON.stringify(files));
        formData.append("code", `${parseInt(String(Math.random() * (Math.random() * 100)))}`);

        uploading.forEach((file, i) => {
          formData.append(`file`, file.file!);
          if (isUpdate) {
            formData.append(`removeFile`, file.refile?.id!)
          }
        });

        const file = await fetch('/api/files', {
          method: isUpdate ? 'PUT' : 'POST',
          body: formData
        });

        if (!file.ok) {
          return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the files', active: `${Math.random()}_show` });
        };

        if (!isUpdate) {
          setUploading([]);
        };

        setFiles([]);
        return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
      })();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, productId])

  return (
    <Container>
      <MultiFiles>
        {
          uploading?.map((file, index) => (
            <label style={styles} key={index} onClick={() => handleRemoveImage(index)}>
              <Image width={400 / 3.1} height={400 / 3.1} src={file.url!} alt="img" style={{ objectFit: 'cover' }} />
            </label>
          ))
        }
        {
          Array.from({ length: (9 - uploading?.length) }).map((_, index) => (
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