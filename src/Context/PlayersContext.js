import { createContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { playersReducer, PLAYERS_ACTIONS } from './reducers/playersReducer';

const PlayersContext = createContext(undefined);

export { PlayersContext };

export const PlayersProvider = ({ children }) => {
  const [players, dispatch] = useReducer(playersReducer, []);

  // Load players from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      dispatch({ type: PLAYERS_ACTIONS.LOAD_PLAYERS, payload: JSON.parse(savedPlayers) });
    }
  }, []);

  const addPlayer = useCallback((playerName) => {
    dispatch({ type: PLAYERS_ACTIONS.ADD_PLAYER, payload: playerName });
  }, [dispatch]);

  const removePlayer = useCallback((playerName) => {
    dispatch({ type: PLAYERS_ACTIONS.REMOVE_PLAYER, payload: playerName });
  }, [dispatch]);

  const getRandomPlayers = useCallback((quantity, exceptPlayers = []) => {
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
  }, [players]);

  const setPlayers = useCallback((newPlayers) => {
    dispatch({ type: PLAYERS_ACTIONS.SET_PLAYERS, payload: newPlayers });
  }, [dispatch]);

  const contextValue = useMemo(() => ({
    players,
    addPlayer,
    removePlayer,
    setPlayers,
    getRandomPlayers,
    getPlayers: () => players,
  }), [players, addPlayer, removePlayer, setPlayers, getRandomPlayers]);

  return (
    <PlayersContext.Provider value={contextValue}>
      {children}
    </PlayersContext.Provider>
  );
};

 