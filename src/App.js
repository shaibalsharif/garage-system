import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './components/Router'; // Importing your Router component
import { AuthProvider } from './context/AuthContext.js'; // Auth Context for authentication state

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
