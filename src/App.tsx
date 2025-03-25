import { useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
			<CssBaseline />
			<HomePage />
		</ThemeProvider>
  )
}

export default App
