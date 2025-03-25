import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000, // Change if needed
		open: true, // Auto-opens browser on start
	},
	define: {
		'process.env': {}, // Ensures compatibility with some libraries that expect process.env
	},
});
