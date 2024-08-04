import { Dispatch, SetStateAction } from 'react';
import { ChangeHandler } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ITextEditorProps {
  onChange?: Dispatch<SetStateAction<string | null>>;
  onChangeWithReactHookForm?: ChangeHandler;
  name?: string;
}

/**
 * @param onChange - react hook form 사용 안 할 때 넘겨주는 핸들러 ex)setState
 * @param onChangeWithReactHookForm - react hook form 사용시 register('name',{required: ~,...}).onChange 처럼 넘겨준다.
 * @param name - react hook form 사용시 register(name,'~')에 들어갈 name
 */

export default function TextEditor({
  onChange,
  onChangeWithReactHookForm,
  name,
}: ITextEditorProps) {
  const modules = {
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'underline'],
      ],
    },
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
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const text = value; //html이 포함된 text
    const textWithoutHtml = editor.getText(); //html이 포함되지 않은 text
    onChange && onChange(text);
    name &&
      onChangeWithReactHookForm &&
      onChangeWithReactHookForm({ target: { name, value: text } });
    name &&
      onChangeWithReactHookForm &&
      onChangeWithReactHookForm({
        target: { name: `${name}_without_html`, value: textWithoutHtml },
      });
  };

  return (
    <ReactQuill
      style={{ width: '400px', height: '250px' }}
      modules={modules}
      onChange={handleTextChange}>
      <div style={{ width: '400px', height: '200px' }} />
    </ReactQuill>
  );
}
