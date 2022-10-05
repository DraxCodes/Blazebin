import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core']
	},
	server: {
		port: 5173,
		strictPort: false
	},
	preview: {
		port: 4173,
		strictPort: false
	}
};

export default config;
