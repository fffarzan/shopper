import { createSSRApp, inject, reactive } from 'vue';
import App from './App.vue';
import { createRouter } from './router/index';

const __SSR = {};

function createSSRContext () {
    return {
        install (app) {
			app.provide('__SSR', this);
            if (typeof window !== 'undefined' && window['__SSR' as any]) {
				Object.assign(this, window.__SSR);
				delete window[__SSR as any];
            }
        },
        toJS () {
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
