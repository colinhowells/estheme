const { build, cliopts } = require('estrella'); // https://github.com/rsms/estrella
const { sassPlugin } = require('esbuild-sass-plugin'); // https://github.com/glromeo/esbuild-sass-plugin
const notifier = require('node-notifier'); // https://github.com/madhums/node-notifier

build({
	entry: 'js/index.js',
	external: ['*.woff2', '*.svg', '*.jpg', '*.png'],
	plugins: [sassPlugin()],
	// target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
	bundle: true,
	minify: true,
	sourcemap: true,
	outfile: 'build/estheme-bundle.js',
	onEnd(config, result) {
		config.watch &&
			notifier.notify({
				title: config.title,
				message:
					result.errors.length > 0
						? `Build failed with ${result.errors.length} errors`
						: `Build succeeded`,
			});
	},
});

cliopts.watch &&
	require('serve-http').createServer({
		port: 8181,
	});
