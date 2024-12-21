import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		component: () => import('../views/ProductsView.vue'),
	},
	{
		path: '/shopping-cart',
		component: () => import('../views/ShoppingCartView.vue'),
	},
	{
		path: '/products/:id',
		component: () => import('../views/ProductDetailsView.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('../views/ErrorView.vue'),
	},
];

export const createRouter = () =>
	_createRouter({
		history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
		routes,
	});
