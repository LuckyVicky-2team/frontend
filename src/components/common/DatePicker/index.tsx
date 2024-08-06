import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import styles from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { Dispatch, SetStateAction } from 'react';
// import CalendarContainer from './CalenderContainer';

// 사용 예시
// react hook form 사용할 때
// function ExamplePage() {
//   const methods = useForm<NewGatheringFormValues>({
//     mode: 'all',
//   });
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors, isValid },
//   } = methods;
//   return (
//     <>
//       <label htmlFor="gatheringDate">날짜</label>
//       <DatePicker
//         control={control}
//         name="gatheringDate"
//         id="gatheringDate"
//         placeholder="날짜를 선택해 주세요."
//         className={styles.datePicker}
//       />
//     </>
//   );
// }

// react hook form 사용 안 할 때
// function ExamplePage() {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   return (
//     <div className={styles.aaa}>
//        <DatePicker
//         selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//         placeholder="날짜 검색"
//         className={styles.datePicker}
//     </div>
// />
//   );
// }

interface IDatePickerProps<F extends FieldValues> {
  control?: Control<F>; //react hook form 사용할 시
  name?: Path<F>; //react hook form 사용할 시
  selectedDate?: Date | null; //react hook form 사용 안 할 시
  setSelectedDate?: Dispatch<SetStateAction<Date | null>>; //react hook form 사용 안 할 시
  id?: string;
  placeholder?: string;
  time?: boolean;
  className?: string;
}

function DatePicker<F extends FieldValues>({
  control,
  name,
  selectedDate,
  setSelectedDate,
  id = '',
  placeholder,
  time = false,
  className,
}: IDatePickerProps<F>) {
  registerLocale('ko', ko);
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {control && name && (
        <Controller
          rules={control ? { required: '날짜를 입력해 주세요' } : {}}
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
                showTimeSelect={time}
                // popperContainer={CalendarContainer}
              />
            );
          }}
        />
      )}
      {setSelectedDate && (
        <ReactDatePicker
          id={id}
          locale="ko"
          dateFormat="yyyy.MM.dd"
          className={styles.input}
          placeholderText={placeholder}
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          showTimeSelect={time}
        />
      )}
    </div>
  );
}
export default DatePicker;
