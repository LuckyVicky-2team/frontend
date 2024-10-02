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
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';

const modules = {
  toolbar: toolbarOptions,
};

interface ITextEditorProps {
  onChange?: Dispatch<SetStateAction<string | null>>;
  // onChangeWithReactHookForm?: ChangeHandler;
  register?: UseFormRegister<INewGatheringFormValuesRequest>;
  name?: 'content'; //필요시 다른 이름 추가 가능
  id?: string;
  editorContent?: string;
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
  editorContent,
  id,
}: ITextEditorProps) {
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

    if (name && register) {
      // HTML이 포함된 텍스트 업데이트
      register(name).onChange({
        target: { name, value: text },
      });

      // HTML이 포함되지 않은 텍스트 업데이트
      register(`${name}WithoutHtml`, {
        required: '내용을 입력해 주세요.',
      }).onChange({
        target: { name: `${name}WithoutHtml`, value: textWithoutHtml },
      });
    }
  };

  return (
    <ReactQuill
      id={id}
      style={{ width: '100%' }}
      modules={modules}
      defaultValue={editorContent || ''}
      onChange={handleTextChange}
      theme="snow"
    />
  );
}
