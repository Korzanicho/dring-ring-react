import { createContext, useContext, useState } from "react";

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({
		players: [],
    challenges: [],
    selectedPlayer: null,
    selectedCategories: [],
    view: 'settingPlayers'
	});

  const getRandomPlayers = (quantity, exceptPlayers = []) => {
    const randomPlayers = [];
    const playersToUse = [...game.players];

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
  }

  const resolveTemplateTags = (text) => {
    let newText = text;

    const users = getRandomPlayers(1, game.selectedPlayer !== null ? [game.selectedPlayer] : []);

    const tags = {
      name1: game.selectedPlayer?.name,
      name2: users[0].name,
      quantity: Math.floor(Math.random() * 5) + 1,
    }

    Object.keys(tags).forEach((tag) => {
      newText = newText.replace(`{${tag}}`, tags[tag]);
    });

    return newText;
  }

  return (
    <GameContext.Provider
      value={{
        game,
        addPlayer: (playerName) => {
          setGame((prevState) => {
            const newState = {
              ...prevState,
              players: [...prevState.players, { name: playerName }]
            }

            localStorage.setItem('players', JSON.stringify(newState.players));

            return newState;
          });

        },
        removePlayer: (playerName) => {
          setGame((prevState) => {
            const newState = {
              ...prevState,
              players: prevState.players.filter((player) => player.name !== playerName)
            }

            localStorage.setItem('players', JSON.stringify(newState.players));

            return newState;
          });
        },
        setPlayers: (players) => setGame((prevState) => {
          return {
            ...prevState,
            players
          }}
        ),
        getPlayers: () => game.players,
        getView: () => game.view,
        setView: (view) => setGame((prevState) => {
          return {
            ...prevState,
            view
          }
        }),
        getSelectedCategories: () => game.selectedCategories,
        setSelectedCategories: (categories) => setGame((prevState) => {
          return {
            ...prevState,
            selectedCategories: categories
          }
        }),
        setChallenges: (challenges) => setGame((prevState) => {
          return {
            ...prevState,
            challenges
          }
        }),
        getRandomChallenge: () => {
          const randomIndex = Math.floor(Math.random() * game.challenges.length);
          const challenge = game.challenges[randomIndex];
          return {
            ...challenge,
            title: resolveTemplateTags(challenge.title),
            body: resolveTemplateTags(challenge.body)
          }
        },
        getSelectedPlayer: () => game.selectedPlayer,
        setSelectedPlayer: (player) => setGame((prevState) => {
          return {
            ...prevState,
            selectedPlayer: player
          }
        }),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
