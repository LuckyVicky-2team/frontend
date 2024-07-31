import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import styles from './DatePicker.module.scss';

interface IDatePickerProps<F extends FieldValues> {
  control: Control<F>;
  name: Path<F>;
  id?: string;
  label: string;
  hasLabel: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

function DatePicker<F extends FieldValues>({
  control,
  name,
  id,
  placeholder,
  className,
}: IDatePickerProps<F>) {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value } }) => {
          return (
            <ReactDatePicker
              id={id}
              locale="ko"
              dateFormat="yyyy.MM.dd HH:mm"
              className={styles.input}
              placeholderText={placeholder}
              selected={value}
              required={true}
              showTimeSelect
            />
          );
        }}
      />
    </div>
  );
}
export default DatePicker;
