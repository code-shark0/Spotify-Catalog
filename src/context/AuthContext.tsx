import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, handleCallback, login } from '../utils/auth';

const AuthContext = createContext<{ isAuthenticated: boolean; login: () => void }>({
	isAuthenticated: false,
	login: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());

	useEffect(() => {
		if (window.location.pathname === '/callback') {
			handleCallback().then(() => setIsAuthenticated(true));
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
