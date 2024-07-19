import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { ProductsProps } from '@/global/interfaces';
import { Add, Block, Success, Warning } from '@/assets/svg/icons';

import { Container, MultiFiles } from './styles';
import { NotificationContext } from '@/hooks/notification';

type UploadFileProps = {
  file: File;
  url: string;
};

interface UploadProps {
  files: UploadFileProps[] | ProductsProps[] | any;
  setFiles: (f: UploadFileProps[]) => void;

  isUpdate: boolean;
  productId?: string | null;
  isSubmitted: boolean;
  // setFiles: (f: File[]) => void;
};

const Upload: React.FC<UploadProps> = ({ files, setFiles, productId, isUpdate, isSubmitted }) => {
  const { setNotification } = useContext(NotificationContext);

  const styles = {
    opacity: !!productId || isSubmitted ? 0.5 : 1,
    cursor: !!productId || isSubmitted ? 'default' : 'pointer'
  };

  const handleFileChange = (evt: any) => {
    const selectedFile = evt.target.files as File[];
    let field = [...files];

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

          field.push(file);

          if (selectedFile.length === (Number(key) + 1)) {
            setFiles(field);
          };
        };
      };
    };
  };

  const handleRemoveImage = (i: number) => {
    const filter = files.filter((item: any, index: number) => index !== i && item)
    setFiles(filter);
  };

  useEffect(() => {
    if (!!productId && isSubmitted) {
      (async () => {
        const formData = new FormData();

        formData.append("product_id", productId);
        formData.append("code", `${parseInt(String(Math.random() * (Math.random() * 100)))}`);

        files.forEach((file: any, i: number) => {
          if (!file.id) {
            formData.append('file', file.file!);
          } else {
            formData.append('fileId', file.id);
          }
        });

        const file = await fetch(`/api/files`, {
          method: isUpdate ? 'PUT' : 'POST',
          body: formData
        });

        if (!file.ok) {
          return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the files', active: `${Math.random()}_show` });
        };

        if (!isUpdate) {
          setFiles([]);
        };

        return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
      })();
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, isSubmitted])

  return (
    <Container>
      <MultiFiles>
        {
          files?.map((file: any, index: number) => (
            <label style={styles} key={index} onClick={() => handleRemoveImage(index)}>
              <Image width={400 / 3.1} height={400 / 3.1} src={file.url!} alt="img" style={{ objectFit: 'cover' }} />
            </label>
          ))
        }
        {
          Array.from({ length: (9 - files?.length) }).map((_, index) => (
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
        disabled={!!productId || isSubmitted }
        multiple
      />
    </Container>
  )
}

export {
  Upload,
  type UploadFileProps
}