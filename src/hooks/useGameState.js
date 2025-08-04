import { useContext } from 'react';
import { GameStateContext } from '@/Context/GameStateContext';

export const useGameState = () => {
  const context = useContext(GameStateContext);
  
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }

  const { selectedPlayer, setSelectedPlayer, getSelectedPlayer } = context;

  return {
    // State
    selectedPlayer,

    // Actions
    setSelectedPlayer,

    // Getters
    getSelectedPlayer,
  };
}; 