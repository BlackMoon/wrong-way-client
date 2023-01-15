import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { Scene } from './components/Scene/Scene';
import { StoreProvider, CarStore } from './stores';

function App() {
  return (
    <StoreProvider store={new CarStore()}>
      <Scene />
      <ControlPanel />
    </StoreProvider>
  );
}

export default App;
