import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/xpra': {
				target: 'http://localhost:10000',
				rewrite: (path) => path.replace(/^\/xpra/, ''),
				ws: true
			}
		}
	}
});
