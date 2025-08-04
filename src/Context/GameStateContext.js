import { createContext, useReducer } from "react";
import { gameStateReducer, GAME_STATE_ACTIONS } from './reducers/gameStateReducer';

const GameStateContext = createContext(undefined);

export { GameStateContext };

const initialState = {
  selectedPlayer: null
};

export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  const setSelectedPlayer = (player) => {
    dispatch({ type: GAME_STATE_ACTIONS.SET_SELECTED_PLAYER, payload: player });
  };

  return (
    <GameStateContext.Provider
      value={{
        selectedPlayer: state.selectedPlayer,
        setSelectedPlayer,
        getSelectedPlayer: () => state.selectedPlayer,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

 