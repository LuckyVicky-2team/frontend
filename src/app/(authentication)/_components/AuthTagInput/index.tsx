import { UseFormSetValue } from 'react-hook-form';
import TagInput from '@/components/common/TagInput';
import styles from './AuthTagInput.module.scss';
import { EmailSignupFormType } from '@/types/request/authRequestTypes';

export default function AuthTagInput({
  setValue,
}: {
  setValue: UseFormSetValue<EmailSignupFormType & { passwordCheck: string }>;
}) {
  const setPRTagValues = (tags: string[]) => {
    setValue('prTags', tags);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="prTags">
        PR 태그
      </label>
      <TagInput id="prTags" setItems={setPRTagValues} />
    </div>
  );
}
