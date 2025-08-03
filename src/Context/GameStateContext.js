import { createContext, useContext, useReducer } from "react";
import { gameStateReducer, GAME_STATE_ACTIONS } from './reducers/gameStateReducer';

const GameStateContext = createContext(undefined);

const initialState = {
  view: 'settingPlayers',
  selectedPlayer: null
};

export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameStateReducer, initialState);

  const setView = (view) => {
    dispatch({ type: GAME_STATE_ACTIONS.SET_VIEW, payload: view });
  };

  const setSelectedPlayer = (player) => {
    dispatch({ type: GAME_STATE_ACTIONS.SET_SELECTED_PLAYER, payload: player });
  };

  return (
    <GameStateContext.Provider
      value={{
        view: state.view,
        setView,
        selectedPlayer: state.selectedPlayer,
        setSelectedPlayer,
        getView: () => state.view,
        getSelectedPlayer: () => state.selectedPlayer,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}; 