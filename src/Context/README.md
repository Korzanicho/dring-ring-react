# Context Architecture

This project uses a focused context architecture with **useReducer** for centralized state management and improved maintainability.

## Context Structure

### 1. PlayersContext (`src/Context/PlayersContext.js`)
**Responsibility**: Player management and operations
- **State**: `players` array
- **Reducer**: `playersReducer`
- **Actions**: 
  - `ADD_PLAYER` - Add a new player
  - `REMOVE_PLAYER` - Remove a player by name
  - `SET_PLAYERS` - Set the entire players array
  - `LOAD_PLAYERS` - Load players from localStorage
- **Operations**: 
  - `addPlayer(playerName)`
  - `removePlayer(playerName)`
  - `setPlayers(players)`
  - `getPlayers()`
  - `getRandomPlayers(quantity, exceptPlayers)`
- **Persistence**: Automatically saves to localStorage
- **Hook**: `usePlayers()`

### 2. GameStateContext (`src/Context/GameStateContext.js`)
**Responsibility**: UI state management
- **State**: 
  - `view` (current view: 'settingPlayers', 'categories', 'wheel', 'playing')
  - `selectedPlayer` (currently selected player)
- **Reducer**: `gameStateReducer`
- **Actions**:
  - `SET_VIEW` - Change the current view
  - `SET_SELECTED_PLAYER` - Set the selected player
  - `RESET_GAME_STATE` - Reset to initial state
- **Operations**:
  - `setView(view)`
  - `getView()`
  - `setSelectedPlayer(player)`
  - `getSelectedPlayer()`
- **Hook**: `useGameState()`

### 3. ChallengesContext (`src/Context/ChallengesContext.js`)
**Responsibility**: Challenge management and template resolution
- **State**: `challenges` array
- **Reducer**: `challengesReducer`
- **Actions**:
  - `SET_CHALLENGES` - Set the challenges array
  - `CLEAR_CHALLENGES` - Clear all challenges
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
- **Reducer**: `categoriesReducer`
- **Actions**:
  - `SET_SELECTED_CATEGORIES` - Set the entire categories array
  - `ADD_CATEGORY` - Add a single category
  - `REMOVE_CATEGORY` - Remove a single category
  - `CLEAR_CATEGORIES` - Clear all categories
- **Operations**:
  - `setSelectedCategories(categories)`
  - `addCategory(category)`
  - `removeCategory(category)`
  - `clearCategories()`
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

### Using Actions Directly (Advanced)
```jsx
import { useCategories, CATEGORIES_ACTIONS } from '@/Context';

function MyComponent() {
  const { addCategory, removeCategory } = useCategories();
  
  // These functions dispatch the appropriate actions
  const handleAdd = () => addCategory({ id: 1, name: 'Test' });
  const handleRemove = () => removeCategory({ id: 1, name: 'Test' });
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
2. **Centralized State Logic**: All state changes go through reducers with clear actions
3. **Better Performance**: Components only re-render when their specific context changes
4. **Easier Testing**: Each context and reducer can be tested in isolation
5. **Improved Maintainability**: Changes to one domain don't affect others
6. **Clear Dependencies**: It's obvious which contexts a component depends on
7. **Predictable State Updates**: All state changes follow the reducer pattern
8. **Scalability**: Easy to add new contexts and actions for new features
9. **Debugging**: Actions provide clear audit trail of state changes

## Reducer Pattern Benefits

- **Predictable State Updates**: All state changes go through defined actions
- **Centralized Logic**: State transformation logic is in one place
- **Easier Debugging**: Actions provide clear audit trail
- **Better Testing**: Reducers are pure functions that are easy to test
- **Performance**: React can optimize re-renders better with useReducer