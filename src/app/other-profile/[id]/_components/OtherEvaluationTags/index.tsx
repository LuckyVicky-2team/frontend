'use client';

import { notFound } from 'next/navigation';
import { useGetOtherEvaluationTags } from '@/api/queryHooks/otherProfile';
import EvaluationTag from './EvaluationgTag';
import styles from './OtherEvaluationTags.module.scss';

export default function OtherEvaluationTags({ userId }: { userId: number }) {
  const { data } = useGetOtherEvaluationTags(userId);

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.positive}>
        {data.positiveTags.map(tag => {
          return (
            <EvaluationTag
              key={tag.evaluationTagId}
              text={tag.tagPhrase}
              count={tag.count}
              type={tag.evaluationType}
            />
          );
        })}
      </div>
      <div className={styles.negative}>
        {data.negativeTags.map(tag => {
          return (
            <EvaluationTag
              key={tag.evaluationTagId}
              text={tag.tagPhrase}
              count={tag.count}
              type={tag.evaluationType}
            />
          );
        })}
      </div>
    </div>
  );
}
