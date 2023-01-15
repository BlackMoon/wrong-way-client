import { FC } from 'react';
import './NewGame.scss';

interface NewGameProps {
  click: () => void;
}

export const NewGame: FC<NewGameProps> = ({ click }) => {

  return (
    <button
      className="new-game-btn"
      onClick={click}
      data-testid="new-game-btn"
    >
      <div className="glyph">Start a New Game?</div>
    </button>
  );
};


