import { render } from '@testing-library/react';
import { Players } from './Players';

describe('Players', () => {
  test('renders component', () => {
    const { getByText } = render(<Players />);
    expect(getByText(/Players/i)).toBeInTheDocument();
  });
});