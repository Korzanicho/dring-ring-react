import { createContext, useContext, useState } from "react";

const GameStateContext = createContext(undefined);

export const GameStateProvider = ({ children }) => {
  const [view, setView] = useState('settingPlayers');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <GameStateContext.Provider
      value={{
        view,
        setView,
        selectedPlayer,
        setSelectedPlayer,
        getView: () => view,
        getSelectedPlayer: () => selectedPlayer,
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