import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		component: () => import('./views/HomeView.vue'),
	},
	{
		path: '/about',
		component: () => import('./views/AboutView.vue'),
	},
];

export const createRouter = () =>
	_createRouter({
		history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
		routes,
	});
