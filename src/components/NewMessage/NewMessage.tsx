import './NewMessage.scss';

export const NewMessage = () => {
  return (
    <div className="new-message">
      <div className="new-message__TextOut">
        <input type="text" className="new-message__Text" />
      </div>
      <button className="new-message__Send">
        <div className="glyph">Send</div>
      </button>
    </div>
  );
};
