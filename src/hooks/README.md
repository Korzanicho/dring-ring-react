# Custom Hooks Architecture

This project uses custom hooks to encapsulate business logic and provide a clean, reusable API for components.

## Hook Structure

### 1. usePlayers (`src/hooks/usePlayers.js`)
**Purpose**: Player management and operations
- **State**: `players` array with localStorage persistence
- **Actions**: `addPlayer`, `removePlayer`, `setPlayers`
- **Computed Values**: `hasPlayers`, `getPlayerCount`, `isPlayerExists`
- **Utilities**: `getRandomPlayers`

```javascript
const { 
  players, 
  addPlayer, 
  removePlayer, 
  hasPlayers, 
  isPlayerExists 
} = usePlayers();
```

### 2. useGameState (`src/hooks/useGameState.js`)
**Purpose**: UI state management
- **State**: `view`, `selectedPlayer`
- **Actions**: `setView`, `setSelectedPlayer`, `resetGameState`
- **Computed Values**: `isView`, `isInGame`, `isWheelView`, `isCategoriesView`

```javascript
const { 
  view, 
  setView, 
  isInGame, 
  isWheelView 
} = useGameState();
```

### 3. useChallenges (`src/hooks/useChallenges.js`)
**Purpose**: Challenge management and template resolution
- **State**: `challenges` array
- **Actions**: `setChallenges`, `clearChallenges`
- **Core Logic**: `getRandomChallenge`, `resolveTemplateTags`
- **Utilities**: `hasChallenges`, `getChallengeCount`

```javascript
const { 
  challenges, 
  getRandomChallenge, 
  setChallenges 
} = useChallenges();
```

### 4. useCategories (`src/hooks/useCategories.js`)
**Purpose**: Category selection management
- **State**: `selectedCategories` array
- **Actions**: `addCategory`, `removeCategory`, `toggleCategory`, `clearCategories`
- **Computed Values**: `hasSelectedCategories`, `isCategorySelected`
- **Utilities**: `getSelectedCategoryIds`, `getSelectedCategoryNames`

```javascript
const { 
  selectedCategories, 
  toggleCategory, 
  isCategorySelected 
} = useCategories();
```

### 5. useGame (`src/hooks/useGame.js`)
**Purpose**: Combined game functionality
- **Composition**: Combines all other hooks
- **High-level Actions**: `startGame`, `resetGame`, `canStartGame`
- **Convenience**: Access to all game functionality in one place

```javascript
const { 
  players, 
  gameState, 
  challenges, 
  categories,
  startGame,
  canStartGame 
} = useGame();
```

## Usage Examples

### Simple Component Usage
```javascript
import { usePlayers, useGameState } from '@/hooks';

function MyComponent() {
  const { addPlayer, hasPlayers } = usePlayers();
  const { setView, isInGame } = useGameState();
  
  // Component logic...
}
```

### Advanced Usage with Combined Hook
```javascript
import { useGame } from '@/hooks';

function GameComponent() {
  const { 
    players: { addPlayer, hasPlayers },
    gameState: { setView, isInGame },
    startGame,
    canStartGame 
  } = useGame();
  
  // All game functionality in one place
}
```

### Category Selection (Simplified)
```javascript
import { useCategories } from '@/hooks';

function CategorySelector({ categories }) {
  const { toggleCategory, isCategorySelected } = useCategories();
  
  return (
    <div>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => toggleCategory(category)}
          className={isCategorySelected(category.id) ? 'active' : ''}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
```

## Benefits of Custom Hooks

1. **Separation of Concerns**: Business logic is separated from UI components
2. **Reusability**: Hooks can be used across multiple components
3. **Testability**: Logic can be tested independently of components
4. **Clean Components**: Components focus on rendering and user interaction
5. **Composability**: Hooks can be combined for complex functionality
6. **Type Safety**: Better IntelliSense and error detection
7. **Performance**: Logic can be optimized independently

## Migration from Context

The custom hooks replace the direct context usage:
- **Before**: `import { usePlayers } from '@/Context/PlayersContext'`
- **After**: `import { usePlayers } from '@/hooks/usePlayers'`

All the same functionality is available, but with additional computed values and utilities.

## Hook Composition Pattern

```javascript
// Individual hooks for specific needs
const { addPlayer } = usePlayers();
const { setView } = useGameState();

// Combined hook for complex operations
const { startGame, canStartGame } = useGame();
```

This pattern allows for flexible usage based on component needs. 