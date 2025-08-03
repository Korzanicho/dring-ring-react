import { usePlayers } from './usePlayers';
import { useGameState } from './useGameState';
import { useChallenges } from './useChallenges';
import { useCategories } from './useCategories';

export const useGame = () => {
  const players = usePlayers();
  const gameState = useGameState();
  const challenges = useChallenges();
  const categories = useCategories();

  // Combined functionality
  const startGame = () => {
    if (players.hasPlayers() && categories.hasSelectedCategories()) {
      gameState.setView('wheel');
    }
  };

  const resetGame = () => {
    // Reset view to initial state
    gameState.setView('settingPlayers');
    // Clear selected player
    gameState.setSelectedPlayer(null);
    // Clear categories
    categories.clearCategories();
    // Clear challenges
    challenges.clearChallenges();
  };

  const canStartGame = () => {
    return players.hasPlayers() && categories.hasSelectedCategories();
  };

  const getCurrentPlayer = () => {
    return gameState.getSelectedPlayer();
  };

  const getCurrentView = () => {
    return gameState.getView();
  };

  return {
    // Individual hooks
    players,
    gameState,
    challenges,
    categories,

    // Combined functionality
    startGame,
    resetGame,
    canStartGame,
    getCurrentPlayer,
    getCurrentView,
  };
}; 