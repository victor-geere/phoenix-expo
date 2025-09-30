# AI Coding Agent Guidelines for Phoenix Member

Welcome to the Phoenix Member codebase! This document provides essential guidance for AI coding agents to be productive and aligned with the project's conventions.

## Project Overview

This is an [Expo](https://expo.dev) project created with `create-expo-app`. It uses React Native for building cross-platform mobile applications and leverages Expo's file-based routing system.

### Key Directories

- **`app/`**: Contains the main application code, organized by screens and layouts. File-based routing is used here.
  - Example: `app/(tabs)/explore.tsx` defines the "Explore" tab screen.
- **`components/`**: Reusable UI components.
  - Example: `components/ui/collapsible.tsx` implements a collapsible UI element.
- **`constants/`**: Stores configuration constants like themes.
- **`hooks/`**: Custom React hooks for shared logic.
  - Example: `hooks/use-theme-color.ts` manages dynamic theme colors.
- **`assets/`**: Static assets like images and icons.
- **`scripts/`**: Utility scripts for project maintenance.

### External Dependencies

- **Expo Router**: Enables file-based routing.
- **React Native**: Core framework for building mobile apps.
- **Haptics**: Used in `components/haptic-tab.tsx` for providing tactile feedback.

## Developer Workflows

### Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

### Start the Development Server

Use Expo's development server to preview the app:

```bash
npx expo start
```

### Reset the Project

To reset the project to a blank state:

```bash
npm run reset-project
```

This moves the starter code to the `app-example` directory and creates a blank `app/` directory.

## Project-Specific Conventions

### File-Based Routing

- Screens and layouts are defined in the `app/` directory.
- Use nested folders for grouping related screens (e.g., `app/(tabs)/` for tabbed navigation).

### Theming

- Theme colors are managed in `constants/theme.ts`.
- Use the `use-theme-color` hook for dynamic theming.

### Component Design

- Favor reusable components stored in `components/`.
- Follow the pattern in `components/ui/collapsible.tsx` for creating modular UI elements.

## Examples

### Adding a New Screen

1. Create a new file in the `app/` directory, e.g., `app/new-screen.tsx`.
2. Export a React component as the default export.
3. The file name will automatically become the route.

### Using the Theming System

```tsx
import { useThemeColor } from '../hooks/use-theme-color';

const MyComponent = () => {
  const backgroundColor = useThemeColor({}, 'background');
  return <View style={{ backgroundColor }} />;
};
```

## Notes for AI Agents

- Always follow the file-based routing conventions.
- Ensure new components are reusable and placed in the appropriate `components/` subdirectory.
- Reference existing patterns in the codebase to maintain consistency.
- When in doubt, consult the `README.md` or this document for guidance.

---

Feel free to update this document as the project evolves!