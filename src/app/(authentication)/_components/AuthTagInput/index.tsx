import { FieldValues, UseFormSetValue } from 'react-hook-form';
import TagInput from '@/components/common/TagInput';
import styles from './AuthTagInput.module.scss';

export default function AuthTagInput({
  setValue,
}: {
  setValue: UseFormSetValue<FieldValues>;
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
