import { render } from '@testing-library/react';
import { CarStore } from '../../stores';
import { MessagesIntl } from './Messages';

const id = 'uuid';
const text = 'Nazanin Has Joind the Game';
const color = '#FF3EEC';

describe('Messages', () => {
  const store = new CarStore();
  store.messages = [{ id, text, color }];

  test('renders component', () => {
    const { getByText } = render(<MessagesIntl store={store} />);
    const messageRow = getByText(text)
    expect(messageRow).toBeInTheDocument();
    expect(messageRow).toHaveStyle({ color });
  });
});
