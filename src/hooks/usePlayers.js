import { useContext } from 'react';
import { PlayersContext } from '@/Context/PlayersContext';

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  
  if (context === undefined) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }

  const { players, addPlayer, removePlayer, setPlayers, getRandomPlayers, getPlayers } = context;

  const hasPlayers = () => players.length > 0;

  const getPlayerCount = () => players.length;

  const isPlayerExists = (playerName) => {
    return players.some(player => player.name === playerName);
  };

  return {
    // State
    players,

    // Actions
    addPlayer,
    removePlayer,
    setPlayers,

    // Computed values
    getPlayers,
    getRandomPlayers,
    hasPlayers,
    getPlayerCount,
    isPlayerExists,
  };
}; 