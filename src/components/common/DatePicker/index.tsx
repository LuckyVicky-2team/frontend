import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import styles from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarContainer from './CalenderContainer';

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
  registerLocale('ko', ko);
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, ...fieldProps } }) => {
          return (
            <ReactDatePicker
              {...fieldProps}
              id={id}
              locale="ko"
              dateFormat="yyyy.MM.dd HH:mm"
              className={styles.input}
              placeholderText={placeholder}
              selected={value}
              required={true}
              showTimeSelect
              popperContainer={CalendarContainer}
            />
          );
        }}
      />
    </div>
  );
}
export default DatePicker;
