import { createContext, useContext, useState, useEffect } from "react";

const PlayersContext = createContext(undefined);

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  // Load players from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  const addPlayer = (playerName) => {
    const newPlayers = [...players, { name: playerName }];
    setPlayers(newPlayers);
    localStorage.setItem('players', JSON.stringify(newPlayers));
  };

  const removePlayer = (playerName) => {
    const newPlayers = players.filter((player) => player.name !== playerName);
    setPlayers(newPlayers);
    localStorage.setItem('players', JSON.stringify(newPlayers));
  };

  const getRandomPlayers = (quantity, exceptPlayers = []) => {
    const randomPlayers = [];
    const playersToUse = [...players];

    exceptPlayers.forEach((exceptPlayer) => {
      const index = playersToUse.findIndex((player) => player.name === exceptPlayer.name);
      if (index !== -1) {
        playersToUse.splice(index, 1);
      }
    });

    do {
      const randomIndex = Math.floor(Math.random() * playersToUse.length);
      randomPlayers.push(playersToUse[randomIndex]);
      playersToUse.splice(randomIndex, 1);
    } while (randomPlayers.length < quantity);

    return randomPlayers;
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        addPlayer,
        removePlayer,
        getRandomPlayers,
        getPlayers: () => players,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }
  return context;
}; 