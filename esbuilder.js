#!/usr/bin/env node
const { build, watch } = require('estrella'); // https://github.com/rsms/estrella
const { sassPlugin } = require('esbuild-sass-plugin'); // https://github.com/glromeo/esbuild-sass-pluginin

const DEV = 'development' == process.env.NODE_ENV ? true : false;

const pluginCache = new Map();

const common = {
	bundle: true,
	minify: !DEV,
	watch: DEV,
	incremental: DEV,
	sourcemap: DEV && 'inline',
	debug: DEV,
};
build({
	...common,
	entry: 'js/index.js',
	outfile: 'build/bundle.mjs',
	format: 'esm',
});
build({
	...common,
	entry: 'js/index.js',
	outfile: 'build/legacy.js',
	format: 'iife',
	target: ['es5'],
});

const sassOptions = {
	...common,
	entry: 'scss/styles.scss',
	outfile: 'build/styles.css',
	plugins: [
		sassPlugin({
			cache: pluginCache,
		}),
	],
};
build(sassOptions);

if (DEV) {
	require('serve-http').createServer({
		port: 8181,
	});
	// our sass plugin requires that we watch the path manually
	watch('scss/styles.scss', {}, function () {
		build(sassOptions);
	});
}
