import { createContext, useContext, useReducer } from "react";
import { challengesReducer, CHALLENGES_ACTIONS } from './reducers/challengesReducer';

const ChallengesContext = createContext(undefined);

export const ChallengesProvider = ({ children }) => {
  const [challenges, dispatch] = useReducer(challengesReducer, []);

  const htmlEntities = (str) => {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  const resolveTemplateTags = (text, selectedPlayer, getRandomPlayers) => {
    let newText = text;
    newText = htmlEntities(newText);

    const randomPlayers = getRandomPlayers(1, selectedPlayer !== null ? [selectedPlayer] : []);

    const tags = {
      name1: `<span style="color: var(--color-text)">${selectedPlayer?.name}</span>`,
      name2: `<span style="color: var(--color-text)">${randomPlayers[0]?.name}</span>`,
      quantity: `<span style="color: var(--color-text)">${Math.floor(Math.random() * 5) + 1}</span>`,
    };

    Object.keys(tags).forEach((tag) => {
      newText = newText.replaceAll(`{${tag}}`, tags[tag]);
    });

    return newText;
  };

  const getRandomChallenge = (challengesTypes, selectedPlayer, getRandomPlayers) => {
    let filteredChallenges = challenges;
    if (challengesTypes.length) {
      filteredChallenges = challenges.filter((challenge) => {
        return challengesTypes.includes(challenge.type.name);
      });
    }

    const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
    const challenge = filteredChallenges[randomIndex];
    
    return {
      ...challenge,
      title: resolveTemplateTags(challenge.title, selectedPlayer, getRandomPlayers),
      body: resolveTemplateTags(challenge.body, selectedPlayer, getRandomPlayers)
    };
  };

  const setChallenges = (newChallenges) => {
    dispatch({ type: CHALLENGES_ACTIONS.SET_CHALLENGES, payload: newChallenges });
  };

  return (
    <ChallengesContext.Provider
      value={{
        challenges,
        setChallenges,
        getRandomChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }
  return context;
}; 