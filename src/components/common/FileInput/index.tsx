import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from 'react';
import styles from './FileInput.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';
import useFilePreview from '@/hooks/useFilePreview';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';

// 사용 예시
// react hook form 을 쓸 경우
// const onSubmit = async (gatheringInfo: INewGatheringFormValuesRequest) => {
//   const { image, ...info } = gatheringInfo;
//   const formData = new FormData();
//   formData.append('file', image);
//   formData.append(
//     'requestDTO',
//     new Blob([JSON.stringify(info)], {
//       type: 'application/json',
//     })
//   );
// try {
//   const response = await axios.post('/api/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// } catch (error) {
//   console.error('There was an error uploading the file!', error);
// }
// };
// ...
/* <FileInput id="image" setValue={setValue} > */
//   <Image
//     className={styles.imageIcon}
//     src={'/assets/icons/download.svg'}
//     alt="다운로드 아이콘"
//     width={20}
//     height={20}
//     priority
//   />
//   <p>이미지 업로드</p>
//   <p>파일 형식: jpg 또는 png</p>
//   <p>권장 사이즈: 가로 204px, 세로 247px</p>
//   <p>상세 페이지에서 제일 먼저 보이는 이미지 입니다.</p>
// </FileInput>

//
// react hook form 을 안 쓸 경우
// export default function ExamplePage() {
//   const [image, setImage] = useState<File | ''>('');
//   const handleOnSubmit = async () => {
//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append(
//       'requestDTO',
//       new Blob([JSON.stringify(submitInfo))], {
//         type: 'application/json',
//       })
//     ); //submitInfo는 다른 정보들 (ex: password..)을 담고 있는 객체

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//     } catch (error) {
//       console.error('파일 업로드 중 오류가 발생했습니다.', error);
//     }
//   };
//   return (
//     <form onSubmit={handleOnSubmit}>
//       <FileInput id="image" setImage={setImage}>
//         <Image
//           className={styles.imageIcon}
//           src={'/assets/icons/download.svg'}
//           alt="다운로드 아이콘"
//          width={20}
//           height={20}
//           priority
//         />
//        <p>이미지 업로드</p>
//        <p>파일 형식: jpg 또는 png</p>
//        <p>권장 사이즈: 가로 204px, 세로 247px</p>
//        <p>상세 페이지에서 제일 먼저 보이는 이미지 입니다.</p>
//      </FileInput>
//       <button type="submit" />
//     </form>
//   );
// }

interface IFileInputProps {
  id: 'image'; //다른 id 쓰고 싶은 경우 따로 추가해 주세요.
  selectedImageUrl?: string; //원래 저장되어 있던 이미지
  setValue?: UseFormSetValue<INewGatheringFormValuesRequest>; //react hook form을 쓸 경우 사용. INewGatheringFormValuesRequest와 다른 interface를 사용하고 싶다면 직접 추가해 주세요.
  setImage?: Dispatch<SetStateAction<File | ''>>; //react hook form을 안 쓸 경우 사용
  width?: string;
  height?: string;
  children: ReactNode; //기본 이미지
}

function FileInput({
  id,
  selectedImageUrl,
  setValue,
  setImage,
  width = '100px',
  height = '100px',
  children,
}: IFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { filePreview, setFilePreview, updateFilePreview } =
    useFilePreview(selectedImageUrl);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFilePreview(e.target.files);
      setValue && setValue(id, e.target.files[0]);
      setImage && setImage(e.target.files[0]);
    }
  };

  const handleDeleteImage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFilePreview('');
    //이미지가 없을 때 백엔드 쪽에 null을 넘기기로 함.
    //formData.append('file','');을 할 경우 null이 저장됨.
    setValue && setValue(id, '');
  };
  return (
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
                  // width={width}
                  // height={height}
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
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </div>
      {inputRef.current?.files && inputRef.current?.files?.length > 0 && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteImage}>
          사진 삭제
        </button>
      )}
    </>
  );
}
export default FileInput;
