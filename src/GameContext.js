import { createContext, useContext, useState } from "react";

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({
		players: [],
    challenges: [],
    selectedCategories: [],
    view: 'settingPlayers'
	});

  const getRandomPlayers = quantity => {
    // withouth repeating, withouth mutating the original array


    const randomPlayers = [];
    const playerToUse = [...game.players];

    do {
      const randomIndex = Math.floor(Math.random() * playerToUse.length);
      randomPlayers.push(playerToUse[randomIndex]);
      playerToUse.splice(randomIndex, 1);
    } while (randomPlayers.length < quantity);

    return randomPlayers;
  }

  const resolveTemplateTags = (text) => {
    let newText = text;

    const users = getRandomPlayers(2);

    console.log('users', users);

    const tags = {
      name1: users[0].name,
      name2: users[1].name,
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
        // setTheme: () => setTheme(theme === "light" ? "dark" : "light"),
        addPlayer: (playerName) => setGame((prevState) => {
					return {
						...prevState,
						players: [...prevState.players, { name: playerName }]
					}
				}),
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
        }
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
