'use client';

import { useState } from 'react';
import styles from './Example.module.scss';
import DatePicker from '@/components/common/DatePicker';

function ExamplePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className={styles.aaa}>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        placeholder="날짜 검색"
        className={`${styles.datePicker}`}
      />
    </div>
  );
}

export default ExamplePage;
