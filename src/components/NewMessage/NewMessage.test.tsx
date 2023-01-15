import { fireEvent, render, screen } from '@testing-library/react';
import { NewMessage } from './NewMessage';

const mockClick = jest.fn();

describe('NewMessage', () => {
  const getNewMessageBtn = () => screen.getByTestId('new-message-btn');

  test('renders component', () => {
    render(<NewMessage />);
    const newMessageBtn = getNewMessageBtn();
    expect(newMessageBtn).toBeInTheDocument();
    expect(newMessageBtn).toHaveTextContent('Send');
  });

  test('should handle button click', () => {
    render(<NewMessage click={mockClick} />);
    const newMessageBtn = getNewMessageBtn();
    fireEvent.click(newMessageBtn);
    expect(mockClick).toBeCalled();
  });
});
