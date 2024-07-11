"use client"

import React, { useEffect, useState } from 'react';

import { Container, Load } from './styles';
import { Loading } from '../loading';

type UploadFileProps = {
  file: File;
  preview: string;
}

interface UploadProps {
  uploading: boolean;
  setFile: (UploadFile: File) => void;
}

export const Upload: React.FC<UploadProps> = ({ uploading, setFile }) => {
  const [loadingFile, setLoadingFile] = useState<'empty' | 'loading' | 'have'>('empty');
  const [preview, setPreview] = useState<string | null>(null);

  const styles = {
    opacity: uploading ? 0.5 : 1,
    cursor: uploading ? 'default' : 'pointer'
  };

  const handleFileChange = (evt: any) => {
    const reader = new FileReader();
    const selectedFile = evt.target.files[0];

    setLoadingFile('loading')

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent: any) => {
      setFile(selectedFile)
      setPreview(readerEvent.target.result)
    };

    setLoadingFile('have');
  };

  useEffect(() => {
    if (!uploading) {
      setPreview(null);
      setLoadingFile('empty');
    }
  }, [uploading]);

  return (
    <Container>
      {loadingFile === 'loading' && (
        <Load>
          <Loading visible={loadingFile === 'loading'} />
        </Load>
      )}

      {loadingFile === 'empty' && (
        <label htmlFor="file">
          Choose a file
        </label>
      )}

      {loadingFile === 'have' && (
        <label htmlFor="file" style={styles}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview!} alt="img" />
        </label>
      )}

      <input
        id="file"
        type="file"
        name='file'
        onChange={handleFileChange}
        disabled={uploading}
      />
    </Container>
  )
}
