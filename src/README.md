# Component Organization

This project follows a feature-based component organization structure:

## Directory Structure

```
src/
├── features/           # Feature-specific components
│   ├── wheel/         # Lucky wheel functionality
│   │   ├── LuckyWheel/
│   │   └── index.js
│   ├── players/       # Player management
│   │   ├── AddPlayerForm/
│   │   ├── PlayersList/
│   │   └── index.js
│   ├── challenges/    # Challenge system
│   │   ├── ChallengeDefault/
│   │   └── index.js
│   └── categories/    # Category management
│       ├── CategoriesList/
│       └── index.js
├── components/        # Reusable UI components
│   ├── TheButton/
│   ├── BackButton/
│   ├── layout/
│   │   └── TheHeader/
│   └── index.js
├── views/            # Page-level components
│   ├── WheelView/
│   ├── PlayingView/
│   ├── CategoriesView/
│   └── SettingPlayerView/
├── hooks/            # Custom React hooks
│   ├── usePlayers.js
│   ├── useGameState.js
│   ├── useChallenges.js
│   ├── useCategories.js
│   ├── useGame.js
│   └── index.js
├── utils/            # Utility functions
├── Context/          # Focused React Context providers
│   ├── PlayersContext.js
│   ├── GameStateContext.js
│   ├── ChallengesContext.js
│   ├── CategoriesContext.js
│   ├── AppProvider.js
│   └── index.js
├── config/           # Configuration files
└── assets/           # Static assets
```

## Component Categories

### Features (`src/features/`)
Components that are specific to a particular feature or domain:
- **wheel**: Lucky wheel spinning functionality
- **players**: Player management and list
- **challenges**: Challenge display and logic
- **categories**: Category selection and management

### Components (`src/components/`)
Truly reusable UI components that can be used across different features:
- **TheButton**: Reusable button component
- **BackButton**: Navigation back button
- **TheHeader**: Application header

### Views (`src/views/`)
Page-level components that compose features and components:
- **WheelView**: Wheel spinning page
- **PlayingView**: Game playing page
- **CategoriesView**: Category selection page
- **SettingPlayerView**: Player setup page

## Import Guidelines

- Use index files for clean imports: `import { TheButton } from '@/components'`
- Feature components should be imported directly: `import LuckyWheel from '@/features/wheel/LuckyWheel/LuckyWheel'`
- Views should import from features and components as needed
- Custom hooks can be imported individually or from index: `import { usePlayers, useGameState } from '@/hooks'`
- Context hooks can be imported individually or from index: `import { usePlayers, useGameState } from '@/Context'`

## Adding New Components

1. **Feature-specific components**: Add to appropriate `src/features/[feature-name]/`
2. **Reusable components**: Add to `src/components/` and update `src/components/index.js`
3. **Utility functions**: Add to `src/utils/`
4. **Custom hooks**: Add to `src/hooks/`

## State Management

This project uses a **custom hooks architecture** built on top of focused contexts:

### Custom Hooks (Primary API)
- **usePlayers**: Player management with localStorage persistence
- **useGameState**: UI state management with computed values
- **useChallenges**: Challenge management and template resolution
- **useCategories**: Category selection with toggle functionality
- **useGame**: Combined hook for high-level game operations

### Context Layer (Internal)
- **PlayersContext**: Player state and operations
- **GameStateContext**: UI state management
- **ChallengesContext**: Challenge state and logic
- **CategoriesContext**: Category selection state

See `src/hooks/README.md` for detailed documentation of the custom hooks API.
See `src/Context/README.md` for detailed documentation of Context. 