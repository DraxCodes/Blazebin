import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core', '@vscode/vscode-languagedetection']
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
