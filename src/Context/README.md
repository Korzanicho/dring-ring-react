# Context Architecture

This project uses a focused context architecture to separate concerns and improve maintainability.

## Context Structure

### 1. PlayersContext (`src/Context/PlayersContext.js`)
**Responsibility**: Player management and operations
- **State**: `players` array
- **Operations**: 
  - `addPlayer(playerName)`
  - `removePlayer(playerName)`
  - `getPlayers()`
  - `getRandomPlayers(quantity, exceptPlayers)`
- **Persistence**: Automatically saves to localStorage
- **Hook**: `usePlayers()`

### 2. GameStateContext (`src/Context/GameStateContext.js`)
**Responsibility**: UI state management
- **State**: 
  - `view` (current view: 'settingPlayers', 'categories', 'wheel', 'playing')
  - `selectedPlayer` (currently selected player)
- **Operations**:
  - `setView(view)`
  - `getView()`
  - `setSelectedPlayer(player)`
  - `getSelectedPlayer()`
- **Hook**: `useGameState()`

### 3. ChallengesContext (`src/Context/ChallengesContext.js`)
**Responsibility**: Challenge management and template resolution
- **State**: `challenges` array
- **Operations**:
  - `setChallenges(challenges)`
  - `getRandomChallenge(challengeTypes, selectedPlayer, getRandomPlayers)`
- **Features**:
  - Template tag resolution (`{name1}`, `{name2}`, `{quantity}`)
  - HTML entity encoding
- **Hook**: `useChallenges()`

### 4. CategoriesContext (`src/Context/CategoriesContext.js`)
**Responsibility**: Category selection state
- **State**: `selectedCategories` array
- **Operations**:
  - `setSelectedCategories(categories)`
  - `getSelectedCategories()`
- **Hook**: `useCategories()`

## Provider Hierarchy

```jsx
<AppProvider>
  <PlayersProvider>
    <GameStateProvider>
      <ChallengesProvider>
        <CategoriesProvider>
          {/* App Components */}
        </CategoriesProvider>
      </ChallengesProvider>
    </GameStateProvider>
  </PlayersProvider>
</AppProvider>
```

## Usage Examples

### Using Multiple Contexts in a Component
```jsx
import { usePlayers, useGameState, useChallenges } from '@/Context';

function MyComponent() {
  const { getPlayers, addPlayer } = usePlayers();
  const { setView, getView } = useGameState();
  const { getRandomChallenge } = useChallenges();
  
  // Component logic...
}
```

### Context-Specific Operations
```jsx
// Player operations
const { addPlayer, removePlayer, getRandomPlayers } = usePlayers();

// UI state operations
const { setView, getSelectedPlayer } = useGameState();

// Challenge operations
const { getRandomChallenge } = useChallenges();

// Category operations
const { setSelectedCategories, getSelectedCategories } = useCategories();
```

## Benefits of This Architecture

1. **Separation of Concerns**: Each context has a single, well-defined responsibility
2. **Better Performance**: Components only re-render when their specific context changes
3. **Easier Testing**: Each context can be tested in isolation
4. **Improved Maintainability**: Changes to one domain don't affect others
5. **Clear Dependencies**: It's obvious which contexts a component depends on
6. **Scalability**: Easy to add new contexts for new features