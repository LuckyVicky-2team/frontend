import { IEvalueationTag } from '@/types/response/OtherProfileRES';
import EvaluationTag from './EvaluationgTag';
import styles from './OtherEvaluationTags.module.scss';

interface IOtherEvaluationTagsProps {
  positiveTags: IEvalueationTag[];
  negativeTags: IEvalueationTag[];
}

export default function OtherEvaluationTags({
  positiveTags,
  negativeTags,
}: IOtherEvaluationTagsProps) {
  return positiveTags.length || negativeTags.length ? (
    <div className={styles.container}>
      {positiveTags?.map((tag, index) => {
        return (
          <EvaluationTag
            key={index}
            text={tag.tagPhrase}
            count={tag.count}
            type="POSITIVE"
          />
        );
      })}
      {negativeTags?.map((tag, index) => {
        return (
          <EvaluationTag
            key={index}
            text={tag.tagPhrase}
            count={tag.count}
            type="NEGATIVE"
          />
        );
      })}
    </div>
  ) : (
    <div className={styles.except}>아직 다른사람의 후기가 없습니다.</div>
  );
}
