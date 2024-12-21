import { basename } from 'node:path';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';

export async function render(url: string, manifest) {
	const ctx = {} as { modules: string[] };
	const { app, router, ssrContext } = createApp();
	await router.push(url);
	await router.isReady();
	const html = await renderToString(app, ctx);
	const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
	return [html, preloadLinks, ssrContext.toJS()];
}

// @ts-expect-error because of lack of time
function renderPreloadLinks(modules, manifest) {
	let links = '';
	const seen = new Set();
	// @ts-expect-error because of lack of time
	modules.forEach(id => {
		const files = manifest[id];
		if (files) {
			// @ts-expect-error because of lack of time
			files.forEach(file => {
				if (!seen.has(file)) {
					seen.add(file);
					const filename = basename(file);
					if (manifest[filename]) {
						for (const depFile of manifest[filename]) {
							links += renderPreloadLink(depFile);
							seen.add(depFile);
						}
					}
					links += renderPreloadLink(file);
				}
			});
		}
	});
	return links;
}

// @ts-expect-error because of lack of time
function renderPreloadLink(file) {
	if (file.endsWith('.js')) {
		return `<link rel="modulepreload" crossorigin href="${file}">`;
	} else if (file.endsWith('.css')) {
		return `<link rel="stylesheet" href="${file}">`;
	} else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
	} else if (file.endsWith('.png')) {
		return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
	}
	return '';
}
