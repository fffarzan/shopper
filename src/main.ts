import { createSSRApp, type App as AppType } from 'vue';
import App from './App.vue';
import { createRouter } from './router/index';

const __SSR = {};

export type SSRContext = {
	install: (app: AppType) => void;
	toJS: () => string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

function createSSRContext(): SSRContext {
	return {
		install(app: AppType) {
			app.provide('__SSR', this);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (typeof window !== 'undefined' && window['__SSR' as any]) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Object.assign(this, (window as any).__SSR);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				delete window[__SSR as any];
			}
		},
		toJS() {
			return `window.__SSR = ${JSON.stringify(this)}`;
		},
	};
}

export function createApp() {
	const app = createSSRApp(App);
	const router = createRouter();
	const ssrContext = createSSRContext();
	app.use(router);
	app.use(ssrContext);
	return { app, router, ssrContext };
}
