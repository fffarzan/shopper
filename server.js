import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const PORT = 1234;

export async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production', hmrPort) {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const resolve = p => path.resolve(__dirname, p);
	const htmlTemplate = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';
	const manifest = isProd ? JSON.parse(fs.readFileSync(resolve('dist/client/.vite/ssr-manifest.json'), 'utf-8')) : {};

	const app = express();

	let vite;
	if (!isProd) {
		vite = await (
			await import('vite')
		).createServer({
			base: '/',
			root,
			logLevel: 'info',
			server: {
				middlewareMode: true,
				watch: {
					usePolling: true,
					interval: 100,
				},
				hmr: {
					port: hmrPort,
				},
			},
			appType: 'custom',
		});
		app.use(vite.middlewares);
	} else {
		app.use((await import('compression')).default());
		app.use(
			'/',
			(await import('serve-static')).default(resolve('dist/client'), {
				index: false,
			}),
		);
	}

	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl;

			let template, render;
			if (!isProd) {
				template = fs.readFileSync(resolve('index.html'), 'utf-8');
				template = await vite.transformIndexHtml(url, template);
				render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;
			} else {
				template = htmlTemplate;
				render = (await import('./dist/server/entry-server.js')).render;
			}

			const [appHtml, preloadLinks, ssrContext] = await render(url, manifest);

			const html = template
				.replace(`<!--preload-links-->`, preloadLinks)
				.replace(`<!--app-html-->`, appHtml)
				.replace(`<!--app-ssr-context-->`, `<script>${ssrContext}</script>`);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			vite && vite.ssrFixStacktrace(e);
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	});

	return { app, vite };
}

createServer().then(({ app }) =>
	app.listen(PORT, () => {
		console.log(`http://localhost:${PORT}`);
	}),
);
