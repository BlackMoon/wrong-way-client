import { render } from '@testing-library/react';
import { Score } from './Score';

describe('Score', () => {
  test('renders component', () => {
    const { getByText } = render(<Score />);
    expect(getByText('Your Last Record')).toBeInTheDocument();
  });
});
