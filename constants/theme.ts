export const Colors = {
  light: {
    text: '#000',
    background: '#fff', // Light mode background
    card: '#f8f8f8',
    border: '#e0e0e0',
    notification: '#ff453a',  // iOS system red
  },
  dark: {   
    text: '#fff',
    background: '#121212', // Dark mode background
    card: '#1e1e1e',  
    border: '#272729',
    notification: '#ff453a',  // iOS system red
  },
};

// constants/theme.ts
export const theme = {
  primary: '#4a90e2', // Soft blue
  background: '#e0e5ec', // Neomorphic background
  shadowLight: '#ffffff', // Light shadow
  shadowDark: '#c4c7d0', // Dark shadow
  accent: '#f5a623', // Warm accent
  textPrimary: '#2e2e2e', // Dark text
  textSecondary: '#6b7280', // Muted text
};

// Neomorphic shadow style for React Native
export const neomorphicShadow = (size: number = 8) => ({
  shadowColor: theme.shadowDark,
  shadowOffset: { width: size, height: size },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 5, // For Android
  // Simulate light shadow (optional, adjust based on design needs)
  borderColor: theme.shadowLight,
  borderWidth: 1,
});