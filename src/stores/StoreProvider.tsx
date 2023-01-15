import { ComponentType, createContext, ReactNode, useContext } from 'react';
import { CarStore } from './CarStore';

const StoreContext = createContext<CarStore>(null as any);

export const StoreProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: any;
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);

export type TWithStore = <P extends object>(
  Component: ComponentType<P>,
) => (props: any) => JSX.Element;

export const withStore = <P extends object>(Component: ComponentType<P>) => (props: any) => {
  return <Component {...props} store={useStores()} />;
};