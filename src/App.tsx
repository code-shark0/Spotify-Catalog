import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import Homepage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
			<CssBaseline />
			<Homepage />
		</ThemeProvider>
  )
}

export default App
