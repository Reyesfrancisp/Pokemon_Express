import { useReducer, useContext, createContext } from 'react';

import { initial_state, actions, reducer } from './store_reducer';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial_state);

  return (
    <StoreContext.Provider value={{ ...state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);