import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, handleCallback, login, logout, refreshAccessToken } from '../utils/auth';

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
					window.location.href = '/';
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

	useEffect(() => {
		if (isAuthenticated) {
			// Im assuming that 60 minutes is the interval here based on the Spotify documentation, however
			// in the authorization, it gives us an expires_in value that we should be using to determine this
			// interval instead.
			const interval = setInterval(() => {
				refreshAccessToken();
			}, 1000 * 60 * 59); // Refresh every 59 minutes
			return () => clearInterval(interval);
		}
	}, [isAuthenticated]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
