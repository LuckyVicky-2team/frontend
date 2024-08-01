import { useRef } from 'react';
import styles from './FileInput.module.scss';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';
import useFilePreview from '@/hooks/useFilePreview';

interface IFileInputProps {
  id: string;
  selectedImageUrl?: string; //원래 저장되어 있던 이미지
  setValue: UseFormSetValue<FieldValues>;
}

function FileInput({ id, selectedImageUrl, setValue }: IFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { filePreview, setFilePreview } = useFilePreview(
    inputRef.current?.files,
    selectedImageUrl
  );

  // const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFilePreview(e.)
  // };
  const handleDeleteImage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFilePreview('');
    setValue && setValue(id, null);
  };
  return (
    <div className={styles.imageUploadBox}>
      <label htmlFor={id} className={styles.imageLabel}>
        {filePreview ? (
          <div className={styles.imagePreview}>
            <Image
              src={filePreview}
              alt="이미지 미리보기"
              className={styles.filePreview}
              fill
            />
          </div>
        ) : (
          <div className={styles.imagePreview}>
            <Image
              className={styles.imageIcon}
              src={''}
              alt="기본 이미지"
              width={30}
              height={30}
            />
          </div>
        )}
      </label>
      <input
        id={id}
        className={styles.imageInput}
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        // onChange={handleFileInputChange}
      />
      {inputRef.current?.files && inputRef.current?.files?.length > 0 && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteImage}>
          사진 삭제
        </button>
      )}
    </div>
  );
}
export default FileInput;
