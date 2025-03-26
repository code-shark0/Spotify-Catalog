import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import Homepage from "./pages/HomePage";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/callback" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
                <CssBaseline />
                <LoginPage />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
