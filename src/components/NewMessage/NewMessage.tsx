import { FC } from 'react';
import './NewMessage.scss';

interface NewMessageProps {
  click?: () => void;
}

export const NewMessage: FC<NewMessageProps> = ({ click }) => {
  return (
    <div className="new-message">
      <div className="new-message__TextOut">
        <input type="text" className="new-message__Text" />
      </div>
      <span style={{ flex: '1 1 auto' }}></span>
      <button className="new-message__Send" data-testid="new-message-btn" onClick={click}>
        <div className="glyph">Send</div>
      </button>
    </div>
  );
};
