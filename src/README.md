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
├── Context/          # React Context providers
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

## Adding New Components

1. **Feature-specific components**: Add to appropriate `src/features/[feature-name]/`
2. **Reusable components**: Add to `src/components/` and update `src/components/index.js`
3. **Utility functions**: Add to `src/utils/`
4. **Custom hooks**: Add to `src/hooks/` 