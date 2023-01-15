import { fireEvent, render, screen } from '@testing-library/react';

import { NewGame} from './NewGame';

const mockClick = jest.fn();

describe('NewGame', () => {

  const getNewGameBtn = () => screen.getByTestId('new-game-btn');

  test('renders component', () => {
    render(<NewGame click={mockClick}/>);
    const newGameBtn = getNewGameBtn();
    expect(newGameBtn).toBeInTheDocument();
    expect(newGameBtn).toHaveTextContent('Start a New Game?');
  });

  test('should handle button click', () => {
    render(<NewGame click={mockClick}/>);
    const newGameBtn = getNewGameBtn();
    fireEvent.click(newGameBtn);
    expect(mockClick).toBeCalled();
  })
});