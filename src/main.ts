import { createSSRApp } from 'vue';
import App from './App.vue';
import { createRouter } from './router.ts';

export function createApp() {
	const app = createSSRApp(App);
	const router = createRouter();
	app.use(router);
	return { app, router };
}
