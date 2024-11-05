'use client';
import React from 'react';
import { useState } from 'react';

type Props = {
  onSend: (_newMessage: string) => void;
};

const NewMessageForm: React.FC<Props> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };
  const handleClick = () => {
    onSend(inputText);
    setInputText('');
  };
  return (
    <div
      style={{
        justifyContent: 'center',
        border: '1px solid red',
        margin: '100px 30px 0px 30px',
      }}>
      <input
        style={{
          justifyContent: 'center',
          border: '1px solid blue',
          margin: '30px',
        }}
        type={'text'}
        value={inputText}
        onChange={handleInputChange}
        data-testid="messageText"
      />
      <button onClick={handleClick} data-testid="sendButton">
        Send
      </button>
    </div>
  );
};

export default NewMessageForm;
