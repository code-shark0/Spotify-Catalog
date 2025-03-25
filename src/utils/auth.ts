import queryString from 'query-string';

const CLIENT_ID = '34d36cbac71f4cb7b1471216e6b1b369' //import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SCOPE = 'user-library-read, ';

const generateCodeVerifier = (): string => {
	const array = new Uint8Array(32);
	window.crypto.getRandomValues(array);
	const verifier = btoa(String.fromCharCode(...array))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
	return verifier;
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
	const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
	return challenge;
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
		scope: SCOPE,
	});

	window.location.href = `${AUTH_URL}?${params}`;
};

export const handleCallback = async () => {
	const { code } = queryString.parse(window.location.search);
	if (!code) return;

	const codeVerifier = localStorage.getItem('code_verifier');
	if (!codeVerifier) throw new Error('No code verifier found');

	const body = queryString.stringify({
		client_id: CLIENT_ID,
		grant_type: 'authorization_code',
		code,
		redirect_uri: REDIRECT_URI,
		code_verifier: codeVerifier,
	});

	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	});
	const data = await response.json();
	localStorage.setItem('access_token', data.access_token);
	window.history.replaceState({}, '', '/');
};

export const getAccessToken = () => localStorage.getItem('access_token');

const AuthService = {
    login,
    handleCallback,
    getAccessToken
}

export default AuthService;