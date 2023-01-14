import { Messages } from '../Messages/Messages';
import { NewMessage } from '../NewMessage/NewMessage';
import { Players } from '../Players/Players';
import { Score } from '../Score/Score';
import './ControlPanel.scss';

export const ControlPanel = () => {
  return (
    <footer className="control-panel">
      <Score />
      <div className="wrapper">
        <Messages />
        <NewMessage />
      </div>
      <Players />
    </footer>
  );
};
