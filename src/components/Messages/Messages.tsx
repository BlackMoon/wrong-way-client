import { observer } from 'mobx-react-lite';

import { FC } from 'react';
import { CarStore, withStore } from '../../stores';
import './Messages.scss';

interface MessageProps {
  store: CarStore;
}

export const MessagesIntl: FC<MessageProps> = ({ store }) => {
  const { messages } = store;
  return (
    <section className="messages">
      {messages?.map(({id, text, color}) => (
        <div key={id} className='messages__item' style={{ color }}>{text}</div>
      ))}
    </section>
  );
};

export const Messages = withStore(observer(MessagesIntl));
