// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color (blue)
    },
    secondary: {
      main: '#dc004e', // Secondary color (red)
    },
    background: {
      default: '#f5f5f5', // Background color (light gray)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
