import styles from './FileInputs.module.scss';
import Image from 'next/image';
import { Controller, Control } from 'react-hook-form';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';
import { ChangeEvent, ReactNode, useEffect } from 'react';
import useFilePreview from '@/hooks/useFilePreview';

interface IFileInputProps {
  id: 'image';
  selectedImageUrl?: string;
  control: Control<INewGatheringFormValuesRequest>;
  width?: string;
  height?: string;
  children: ReactNode;
}

export default function FileInputs({
  id,
  selectedImageUrl,
  control,
  width = '100px',
  height = '100px',
  children,
}: IFileInputProps) {
  const { filePreview, setFilePreview, updateFilePreview } =
    useFilePreview(selectedImageUrl);

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (_value: File | string) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      updateFilePreview(e.target.files);
      onChange(e.target.files[0]);
    }
  };

  const handleDeleteImage = (onChange: (_value: string) => void) => {
    setFilePreview('');
    onChange('');
  };

  useEffect(() => {
    if (selectedImageUrl) {
      setFilePreview(selectedImageUrl);
    }
  }, [selectedImageUrl, setFilePreview]);

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <div className={styles.imageUploadBox}>
            <label
              htmlFor={id}
              className={styles.imageLabel}
              style={{
                width: width,
                height: height,
              }}>
              {filePreview ? (
                <div className={styles.imagePreview}>
                  <div
                    style={{
                      width: height,
                      height: height,
                      position: 'relative',
                    }}>
                    <Image
                      src={filePreview}
                      alt="이미지 미리보기"
                      className={styles.filePreview}
                      fill
                      objectFit="contain"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.defaultImage}>{children}</div>
              )}
            </label>
            <input
              id={id}
              className={styles.imageInput}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => handleFileInputChange(e, onChange)}
            />
          </div>
          {(value || filePreview) && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleDeleteImage(onChange)}>
              사진 삭제
            </button>
          )}
        </>
      )}
    />
  );
}
