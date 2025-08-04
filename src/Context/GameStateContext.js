import { createContext, useReducer, useCallback, useMemo } from "react";
import { gameStateReducer, GAME_STATE_ACTIONS } from './reducers/gameStateReducer';

const GameStateContext = createContext(undefined);

export { GameStateContext };

const initialState = {
  selectedPlayer: null
};

export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  const setSelectedPlayer = useCallback((player) => {
    dispatch({ type: GAME_STATE_ACTIONS.SET_SELECTED_PLAYER, payload: player });
  }, [dispatch]);

  const contextValue = useMemo(() => ({
    selectedPlayer: state.selectedPlayer,
    setSelectedPlayer,
    getSelectedPlayer: () => state.selectedPlayer,
  }), [state.selectedPlayer, setSelectedPlayer]);

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  );
};

 