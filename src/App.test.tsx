import { render } from '@testing-library/react';
import App from './App';

jest.mock('@inlet/react-pixi', () => ({
  Container: () => {
    return '<div></div>';
  },
  Stage: () => {
    return '<div></div>';
  },
}));

test('renders component', () => {
  const { getByTestId } = render(<App />);

  const scene = getByTestId('scene');
  expect(scene).toBeInTheDocument();

  const controlPanel = getByTestId('control-panel');
  expect(controlPanel).toBeInTheDocument();
});
