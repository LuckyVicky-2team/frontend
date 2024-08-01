'use client';

import Input from '@/components/common/Input';
import TagInput from '@/components/common/TagInput';
import { useState } from 'react';

export default function Signin() {
  const [items, setItems] = useState<string[]>([]);

  console.log(items);

  return (
    <div>
      <Input />
      <TagInput setItems={setItems} />
    </div>
  );
}
