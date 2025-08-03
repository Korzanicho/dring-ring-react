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
- Context hooks can be imported individually or from index: `import { usePlayers, useGameState } from '@/Context'`

## Adding New Components

1. **Feature-specific components**: Add to appropriate `src/features/[feature-name]/`
2. **Reusable components**: Add to `src/components/` and update `src/components/index.js`
3. **Utility functions**: Add to `src/utils/`
4. **Custom hooks**: Add to `src/hooks/`

## State Management

This project uses a focused context architecture with separate contexts for different concerns:

- **PlayersContext**: Player management and operations
- **GameStateContext**: UI state (views, selected player)
- **ChallengesContext**: Challenge management and template resolution
- **CategoriesContext**: Category selection state

See `src/Context/README.md` for detailed documentation. 