import React, { ReactNode } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';

// 제네릭 타입을 사용한 폼 interface 정의
interface GenericFormInterface<TFormData extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}
export default function ReviewFormProvider<TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions,
}: GenericFormInterface<TFormData>) {
  const methods = useForm<TFormData>(formOptions);
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </>
  );
}
