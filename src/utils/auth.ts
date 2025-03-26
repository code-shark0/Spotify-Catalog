import queryString from 'query-string';

const CLIENT_ID = "34d36cbac71f4cb7b1471216e6b1b369";//import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3001/callback';
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const scope = 'user-library-read';

const generateCodeVerifier = (): string => {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const randomValues = crypto.getRandomValues(new Uint8Array(64));
	const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

	return randomString;
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
	const data = new TextEncoder().encode(verifier);
	const hashed = await crypto.subtle.digest('SHA-256', data);

	const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
	return code_challenge_base64
};

export const login = async () => {
	const codeVerifier = generateCodeVerifier();
	localStorage.setItem('code_verifier', codeVerifier);
	
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	const params = queryString.stringify({
		client_id: CLIENT_ID,
		response_type: 'code',
		redirect_uri: REDIRECT_URI,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge,
		scope,
	});

	window.location.href = `${AUTH_URL}?${params}`;
};

export const handleCallback = async () => {
	const { code, error } = queryString.parse(window.location.search);
	
	// Handle any errors returned from Spotify
	if (error) {
		console.error('Spotify auth error:', error);
		throw new Error(typeof error === 'string' ? error : 'Authentication error from Spotify');
	}
	
	// Validate code is present
	if (!code || typeof code !== 'string') {
		throw new Error('No authorization code found in the callback URL');
	}

	// Get code verifier from localStorage
	const codeVerifier = localStorage.getItem('code_verifier');
	if (!codeVerifier) {
		throw new Error('No code verifier found in local storage');
	}

	try {
		// Prepare token exchange request
		const payload = {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: CLIENT_ID,
				grant_type: 'authorization_code',
				code,
				redirect_uri: REDIRECT_URI,
				code_verifier: codeVerifier,
			}),
		};

		// Make the token exchange request
		const body = await fetch(TOKEN_URL, payload);
		
		// Check if the response is successful
		if (!body.ok) {
			const errorData = await body.json().catch(() => null);
			console.error('Token exchange failed:', body.status, errorData);
			throw new Error(`Token exchange failed: ${body.status} ${body.statusText}`);
		}
		
		// Parse the response
		const response = await body.json();
		
		// Store tokens
		localStorage.setItem('access_token', response.access_token);
		if (response.refresh_token) {
			localStorage.setItem('refresh_token', response.refresh_token);
		}

		// Redirect to the home page
		window.history.replaceState({}, '', '/');

	} catch (error) {
		console.error('Error during token exchange:', error);
		throw error;
	}
};

export const getAccessToken = () => localStorage.getItem('access_token');

export const refreshAccessToken = async () => {
	console.log('Refreshing access token...');
    // refresh token that has been previously stored
	const refreshToken = localStorage.getItem('refresh_token');
	if (!refreshToken) {
		console.error('No refresh token found in local storage');
		return;
	}

	const url = "https://accounts.spotify.com/api/token";

	const payload = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: CLIENT_ID
		}),
	}
	const body = await fetch(url, payload);
	const response = await body.json();

	localStorage.setItem('access_token', response.access_token);
	if (response.refresh_token) {
		localStorage.setItem('refresh_token', response.refresh_token);
	}
}

// I would of course want to add a logout function with a button somewhere in the home page to access it.
export const logout = async () => {
	localStorage.removeItem('access_token');
	window.location.href = '/';
}

const AuthService = {
    login,
	logout,
    handleCallback,
    getAccessToken
}

export default AuthService;