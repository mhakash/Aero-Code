import Layout from 'components/Layout';
import { addMessage, getMessages } from 'lib/api';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useAuth } from '../../lib/hooks/useAuth';

type MessageType = {
  user: 'me' | 'other';
  message: string;
  key: string | number;
};

type Action =
  | {
      type: 'add';
      payload: MessageType;
    }
  | { type: 'clear' };

const initialMessage: MessageType[] = [
];

const reducer = (state: MessageType[], action: Action): MessageType[] => {
  if (action.type === 'add') return [...state, action.payload];
  if (action.type === 'clear') return [];
  else return state;
};

const Message: FC = () => {
  //console.log("called to hoise");
  const auth = useAuth();
  const router = useRouter();
  const { chid } = router.query;

  const { data } = useSWR(
    () => (chid && auth.user ? `/message/${chid}` : null),
    () => getMessages(chid as string),
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (data) {
      dispatchMessage({ type: 'clear' });
      // console.log(data);
      data.forEach((e) => {
        dispatchMessage({
          type: 'add',
          payload: {
            user: e.sender_id === auth.user?._id ? 'me' : 'other',
            message: e.text,
            key: e._id,
          },
        });
      });
    }
  }, [data]);

  const [message, setMessage] = useState('');
  const [messages, dispatchMessage] = useReducer(reducer, initialMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const chat_room = chid as string;
    const msg = message;
    await addMessage(chat_room, msg);
    // console.log(msg);
    setMessage('');

    // Do someting;
    dispatchMessage({
      type: 'add',
      payload: { user: 'me', message: msg, key: Date.now() },
    });
  };

  return (
    <Layout>
      <div>
        {messages.map((e) => (
          <div
            key={e.key}
            className={`p-2 m-2 ${e.user === 'me' ? 'text-right' : 'text-left'}`}
          >
            {e.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 m-2 border-gray-200 border-2 rounded-md"
        />
      </form>
    </Layout>
  );
};

export default Message;
