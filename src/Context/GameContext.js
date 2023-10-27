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

  const htmlEntities = (str) => {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const resolveTemplateTags = (text) => {
    let newText = text;
    newText = htmlEntities(newText);

    const users = getRandomPlayers(1, game.selectedPlayer !== null ? [game.selectedPlayer] : []);

    const tags = {
      name1: `<span style="color: var(--color-text)">${game.selectedPlayer?.name}</span>`,
      name2: `<span style="color: var(--color-text)">${users[0].name}</span>`,
      quantity: `<span style="color: var(--color-text)">${Math.floor(Math.random() * 5) + 1}</span>`,
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
        getRandomChallenge: (challengesTypes) => {
          let filteredChallenges = game.challenges;
          if (challengesTypes.length) {
            filteredChallenges = game.challenges.filter((challenge) => {
              return challengesTypes.includes(challenge.type.name);
            });
          }

          const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
          const challenge = filteredChallenges[randomIndex];
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
