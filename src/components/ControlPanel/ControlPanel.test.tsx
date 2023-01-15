import { render } from '@testing-library/react';
import { ControlPanel } from './ControlPanel';

jest.mock('../Messages/Messages', () => ({
  Messages: () => {
    return '<div></div>';
  },
}));

describe('ControlPanel', () => {
  test('renders component', () => {
    const { getByTestId } = render(<ControlPanel />);
    expect(getByTestId('control-panel')).toBeInTheDocument();
  });
});
