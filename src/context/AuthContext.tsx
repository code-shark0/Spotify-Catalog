import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, handleCallback, login, logout } from '../utils/auth';

const AuthContext = createContext<{ isAuthenticated: boolean; login: () => void, logout: () => void }>({
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());
	const [isProcessingCallback, setIsProcessingCallback] = useState<boolean>(false);

	useEffect(() => {
		if (window.location.pathname === '/callback' && !isProcessingCallback) {
			setIsProcessingCallback(true);
			
			handleCallback()
				.then(() => {
					setIsAuthenticated(true);
					// Use window.history to navigate away from callback path
					window.history.replaceState({}, '', '/');
				})
				.catch(error => {
					console.error('Authentication error:', error);
					// Navigate to login on error
					window.history.replaceState({}, '', '/login');
				})
				.finally(() => {
					setIsProcessingCallback(false);
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
