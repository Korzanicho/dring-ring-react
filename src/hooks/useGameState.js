import { useContext } from 'react';
import { GameStateContext } from '@/Context/GameStateContext';

export const useGameState = () => {
  const context = useContext(GameStateContext);
  
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }

  const { view, selectedPlayer, setView, setSelectedPlayer, getView, getSelectedPlayer } = context;

  const isView = (viewName) => view === viewName;

  const isInGame = () => view === 'playing';

  const isWheelView = () => view === 'wheel';

  const isCategoriesView = () => view === 'categories';

  const isSettingPlayersView = () => view === 'settingPlayers';

  return {
    // State
    view,
    selectedPlayer,

    // Actions
    setView,
    setSelectedPlayer,

    // Getters
    getView,
    getSelectedPlayer,

    // Computed values
    isView,
    isInGame,
    isWheelView,
    isCategoriesView,
    isSettingPlayersView,
  };
}; 