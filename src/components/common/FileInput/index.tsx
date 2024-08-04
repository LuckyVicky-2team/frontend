import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import styles from './FileInput.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';
import useFilePreview from '@/hooks/useFilePreview';

// 사용 예시
// react hook form 을 쓸 경우

// react hook form 을 안 쓸 경우

interface NewGatheringFormValues {
  image: string;
  title: string;
  tags: string;
  content: string;
  contentWithoutHtml: string; //content 유효성 검사를 하기 위한 값
  location: string;
  gatheringDate: Date; //만나는 날짜 === 마감일
  participants: number;
  type: 'free' | 'accept';
}

interface IFileInputProps {
  id:
    | 'type'
    | 'title'
    | 'content'
    | 'image'
    | 'tags'
    | 'location'
    | 'gatheringDate'
    | 'participants';
  selectedImageUrl?: string; //원래 저장되어 있던 이미지
  setValue?: UseFormSetValue<NewGatheringFormValues>; //react hook form을 쓸 경우 사용. NewGatheringFormValues와 다른 interface를 사용하고 싶다면 직접 추가해 주세요.
  setImage?: Dispatch<SetStateAction<string>>; //react hook form을 안 쓸 경우 사용
  width?: number;
  height?: number;
}

function FileInput({
  id,
  selectedImageUrl,
  setValue,
  setImage,
  width = 100,
  height = 100,
}: IFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { filePreview, setFilePreview, updateFilePreview } =
    useFilePreview(selectedImageUrl);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFilePreview(e.target.files);
      // 'imageUrl' 부분은 나중에 수정하겠습니다.
      setValue && setValue(id, 'imageUrl');
      setImage && setImage('imageUrl');
    }
  };

  const handleDeleteImage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFilePreview('');
    //이미지가 없을 때 백엔드 쪽에 ''를 넘길 것인지 null을 넘길 것인 지 상의해야 함
    setValue && setValue(id, '');
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
              width={width}
              height={height}
            />
          </div>
        ) : (
          <div className={styles.imagePreview}>
            <Image
              className={styles.imageIcon}
              src={''}
              alt="기본 이미지"
              width={width}
              height={height}
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
        onChange={handleFileInputChange}
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
