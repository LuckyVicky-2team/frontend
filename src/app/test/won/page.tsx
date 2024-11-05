'use client';

import MessageList from './_components/MessageList';
import NewMessageForm from './_components/NewMessageForm';
import { useState } from 'react';

export default function TestPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const handleSend = (newMessage: string) => {
    setMessages([newMessage, ...messages]);
  };
  return (
    <>
      <NewMessageForm onSend={handleSend} />
      <MessageList data={messages} />
    </>
  );
}
