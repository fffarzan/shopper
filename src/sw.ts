import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();
self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
	// @ts-expect-error because of lack of types in workbox
	({ url }) => url.pathname.startsWith('/content'),
	new StaleWhileRevalidate({
		cacheName: 'product-images',
	}),
);
