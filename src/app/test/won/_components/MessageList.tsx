import React from 'react';

type Props = {
  data: string[];
};
export default function MessageList({ data }: Props) {
  return (
    <>
      {data.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </>
  );
}
