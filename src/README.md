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
│   ├── layout/        # Layout components
│   │   ├── AppLayout/ # Main application layout wrapper
│   │   ├── TheHeader/ # Application header
│   │   ├── PageContainer/ # Page content container
│   │   └── index.js
│   ├── guards/        # Route protection components
│   │   ├── RouteGuard/
│   │   ├── LoadingGuard/
│   │   └── index.js
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
│   ├── useNavigation.js
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

### Layout Components (`src/components/layout/`)
Layout components that handle the overall application structure:
- **AppLayout**: Main application wrapper with header, main content, and footer
- **TheHeader**: Application header component
- **PageContainer**: Page content wrapper for consistent spacing and responsive design

### Views (`src/views/`)
Page-level components that compose features and components:
- **WheelView**: Wheel spinning page
- **PlayingView**: Game playing page
- **CategoriesView**: Category selection page
- **SettingPlayerView**: Player setup page

## Import Guidelines

- Use index files for clean imports: `import { TheButton, AppLayout } from '@/components'`
- Feature components should be imported directly: `import LuckyWheel from '@/features/wheel/LuckyWheel/LuckyWheel'`
- Views should import from features and components as needed
- Custom hooks can be imported individually or from index: `import { usePlayers, useGameState } from '@/hooks'`
- Context hooks can be imported individually or from index: `import { usePlayers, useGameState } from '@/Context'`

## Layout Architecture

The application uses a hierarchical layout structure:

1. **AppLayout**: Main wrapper that provides the overall application structure
   - Includes header, main content area
   - Handles global styling and responsive design
   - Provides consistent spacing and layout

2. **PageContainer**: Content wrapper for individual pages
   - Provides consistent max-width and padding
   - Handles responsive design for different screen sizes
   - Ensures proper content alignment

3. **View Components**: Page-level components wrapped in PageContainer
   - Each view is self-contained and focused on specific functionality
   - Consistent layout and spacing across all pages

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

### Context Layer (Internal)
- **PlayersContext**: Player state and operations
- **GameStateContext**: UI state management
- **ChallengesContext**: Challenge state and logic
- **CategoriesContext**: Category selection state

See `src/hooks/README.md` for detailed documentation of the custom hooks API.
See `src/Context/README.md` for detailed documentation of Context.

## Route Protection & Security

The application implements route guards to ensure proper access control:

### Route Guards (`src/components/guards/`)

- **RouteGuard**: Main component that checks access conditions before rendering protected routes
- **LoadingGuard**: Loading component displayed while checking access permissions

### Protection Rules

1. **Categories View** (`/categories`): Requires at least one player to be added
2. **Wheel View** (`/wheel`): Requires players and selected categories
3. **Playing View** (`/playing`): Requires players, selected categories, and a selected player

### Route Protection Implementation

The route protection is implemented directly in the `RouteGuard` component using the existing hooks:
- **usePlayers**: Checks if players exist
- **useCategories**: Checks if categories are selected
- **useGameState**: Checks if a player is selected

### Automatic Redirects

- Users trying to access protected routes without meeting requirements are automatically redirected to the appropriate page
- Redirects use `replace` to prevent back button issues

## Performance Optimizations

The application implements several performance optimizations to ensure smooth user experience:

### 1. Memoized Expensive Calculations (`useMemo`)

**LuckyWheel Component:**
- `sliceAngle`: Memoized calculation of wheel segment angles
- `playerSegments`: Memoized player segment data with pre-calculated angles and colors
- `drawWheel`: Memoized canvas drawing function

**ChallengesContext:**
- `resolveTemplateTags`: Memoized template tag resolution
- `getRandomChallenge`: Memoized challenge filtering and processing

**Context Providers:**
- Context values are memoized to prevent unnecessary re-renders of consuming components

### 2. Memoized Pure Components (`React.memo`)

**List Components:**
- `CategoriesList`: Memoized to prevent re-renders when props haven't changed
- `PlayersList`: Memoized with optimized event handlers

**UI Components:**
- `TheButton`: Memoized button component with className support
- `BackButton`: Memoized navigation button with optimized click handler

### 3. Optimized Event Handlers (`useCallback`)

- All event handlers are wrapped in `useCallback` to prevent unnecessary re-renders
- Context functions are memoized to maintain stable references
- Navigation functions are optimized for performance

### 4. Benefits

- **Reduced Re-renders**: Components only re-render when their dependencies actually change
- **Faster Rendering**: Expensive calculations are cached and reused
- **Better User Experience**: Smoother interactions, especially with the wheel animation
- **Memory Efficiency**: Prevents unnecessary object creation and function recreation

## Code Quality & Type Safety

The application implements PropTypes for runtime type checking and better code documentation:

### Benefits

- **Runtime Type Checking**: Catches type errors during development
- **Better Documentation**: PropTypes serve as component documentation
- **IDE Support**: Better autocomplete and error detection
- **Team Collaboration**: Clear contract for component usage
- **Error Prevention**: Early detection of incorrect prop usage

## Error Handling & Recovery

The application implements comprehensive error handling through Error Boundaries:

### Error Boundary Implementation (`src/components/ErrorBoundary/`)
- **ErrorBoundary**: Main error boundary component that catches JavaScript errors in the component tree
- **Global Error Boundary**: Wraps the entire application in `App.js`
- **Feature-Specific Boundaries**: Protects complex components like `LuckyWheel`

### Error Boundary Features

- **Graceful Degradation**: Displays user-friendly error messages instead of crashing
- **Recovery Options**: Provides "Try Again" and "Refresh Page" buttons
- **Development Mode**: Shows detailed error information in development
- **Production Safe**: Hides technical details in production builds

### Error Boundary Placement

1. **App-Level**: Catches errors in the entire application
2. **Feature-Level**: Protects complex components (e.g., canvas operations in LuckyWheel)
3. **Context-Level**: Handles errors from context providers and hooks

### Error Types Handled

- **JavaScript Errors**: Runtime errors in component logic
- **Context Errors**: Errors from improper hook usage
- **Canvas Errors**: Rendering errors in LuckyWheel component
- **API Errors**: Network and data processing errors
- **State Errors**: Errors in state management and updates

### Benefits

- **User Experience**: Prevents app crashes and provides recovery options
- **Debugging**: Detailed error information in development
- **Reliability**: Graceful handling of unexpected errors
- **Maintenance**: Better error tracking and reporting capabilities 