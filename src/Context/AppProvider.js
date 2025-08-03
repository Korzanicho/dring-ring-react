import { PlayersProvider } from './PlayersContext';
import { GameStateProvider } from './GameStateContext';
import { ChallengesProvider } from './ChallengesContext';
import { CategoriesProvider } from './CategoriesContext';

export const AppProvider = ({ children }) => {
  return (
    <PlayersProvider>
      <GameStateProvider>
        <ChallengesProvider>
          <CategoriesProvider>
            {children}
          </CategoriesProvider>
        </ChallengesProvider>
      </GameStateProvider>
    </PlayersProvider>
  );
}; 