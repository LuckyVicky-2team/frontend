interface ITagProps {
  evaluationTagId: number;
  tagPhrase: string;
  evaluationType: 'POSITIVE' | 'NEGATIVE';
}
export interface IEvaluationTagsResponseProps {
  positiveTags: ITagProps[];
  negativeTags: ITagProps[];
}
