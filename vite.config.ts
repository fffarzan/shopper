import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.ts',
			registerType: 'autoUpdate',
			manifest: {
				short_name: 'Shopper',
				name: 'Shopper',
				icons: [
					{
						src: '/favicon.ico',
						type: 'image/png',
					},
				],
				display: 'standalone',
				theme_color: '#000000',
				background_color: '#ffffff',
			},
			devOptions: {
				enabled: true,
				type: 'module',
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
