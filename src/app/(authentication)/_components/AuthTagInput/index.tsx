import { UseFormSetValue } from 'react-hook-form';
import TagInput from '@/components/common/TagInput';
import styles from './AuthTagInput.module.scss';

export default function AuthTagInput({
  setValue,
}: {
  setValue: UseFormSetValue<any>;
}) {
  const setPRTagValues = (tags: string[]) => {
    setValue('prTags', tags);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="prTags">
        PR 태그
      </label>
      <TagInput
        id="prTags"
        setItems={setPRTagValues}
        placeholder="태그를 작성해주세요!"
      />
      <div className={styles.suggest}>
        <h1 className={styles.title}>이런 태그는 어떠세요?</h1>
        <ul className={styles.contents}>
          <li className={styles.content}>• 성별</li>
          <li className={styles.content}>• 나이</li>
          <li className={styles.content}>• 성격</li>
          <li className={styles.content}>• MBTI</li>
          <li className={styles.content}>• 좋아하는 게임 장르</li>
          <li className={styles.content}>• 내가 사는 동네</li>
          <li className={styles.content}>
            {'• 나의 게임 스타일(전략가, 승부사, 평화주의자)'}
          </li>
          <li className={styles.content}>
            • 그 외 나를 소개할만한 문구를 적어보세요!
          </li>
        </ul>
      </div>
    </div>
  );
}
