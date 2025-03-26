import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import Homepage from "./pages/HomePage";
import { JSX } from "@emotion/react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
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
