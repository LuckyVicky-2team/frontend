import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
// import { ChangeHandler } from 'react-hook-form';
import { UnprivilegedEditor } from 'react-quill';
// ReactQuill을 동적으로 가져오기. 안 해주면 document is not defined 오류가 남
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from './toolBarOptions';

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

interface ITextEditorProps {
  onChange?: Dispatch<SetStateAction<string | null>>;
  // onChangeWithReactHookForm?: ChangeHandler;
  register?: UseFormRegister<NewGatheringFormValues>;
  name?: 'content'; //필요시 다른 이름 추가 가능
  id?: string;
}

/**
 * @param onChange - react hook form 사용 안 할 때 넘겨주는 핸들러 ex)setState
 * @param register - react hook form 사용시 넘겨줄 register.
 * @param name - react hook form 사용시 register(name,'~')에 들어갈 name
 * @param id - label과 연결할 id
 */

export default function TextEditor({
  onChange,
  register,
  name,
  id,
}: ITextEditorProps) {
  const modules = {
    toolbar: toolbarOptions,
  };

  // react-quill에 정의된 onChange함수:
  // interface ReactQuillProps {
  //   ...
  //   onChange?(value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor): void;
  //   ...
  // }

  const handleTextChange = (
    value: string,
    delta: any,
    source: any,
    editor: UnprivilegedEditor
  ) => {
    const text = value; //html이 포함된 text
    const textWithoutHtml = editor.getText().replace(/\n/g, ''); //html이 포함되지 않은 text
    onChange && onChange(text);
    name &&
      register &&
      register(name).onChange({
        target: { name, value: text },
      });
    name &&
      register &&
      // onChangeWithReactHookForm({
      //   target: { name: nameWithoutHtml(name), value: textWithoutHtml },
      // });
      register(`${name}WithoutHtml`, {
        required: '내용을 입력해 주세요.',
      }).onChange({
        target: { name: `${name}WithoutHtml`, value: textWithoutHtml },
      });
  };

  return (
    <ReactQuill
      id={id}
      style={{ width: '400px', height: '250px' }}
      modules={modules}
      onChange={handleTextChange}>
      <div style={{ width: '400px', height: '200px' }} />
    </ReactQuill>
  );
}
