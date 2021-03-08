// https://dev.to/walpolea/through-the-pipeline-an-exploration-of-front-end-bundlers-ea1

const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const chokidar = require('chokidar');
const browserSync = require('browser-sync').create();

const build = async () => {
	console.log('Building...');
	const service = await esbuild.startService();
	try {
		const timerStart = Date.now();
		await service.build({
			entryPoints: ['js/index.js'],
			// entryPoints: ['css/styles.css', 'js/bundle.js'], // if we were to do css and not sass
			format: 'iife',
			plugins: [sassPlugin()],
			bundle: true,
			minify: true,
			//outdir: 'build',
			outfile: 'build/estheme-bundle.js',
			sourcemap: true,
			// stops esbuild from trying to resolve these things in css, may need to add more types
			external: ['*.woff2', '*.svg', '*.jpg', '*.png'],
		});
		const timerEnd = Date.now();
		console.log(`Done! Built in ${timerEnd - timerStart}ms.`);
	} catch (error) {
		console.log(error);
	} finally {
		service.stop();
	}
};

// watch it? (`npm run dev` will watch)
if (process.argv.includes('--watch')) {
	// chokidar will watch theme files for changes to trigger rebuild
	const watcher = chokidar.watch(['js/*.js', 'css/*.css', '**/*.php']);
	console.log('Watching files... \n');
	// first build:
	build();
	// build on changes
	watcher.on('change', () => {
		build();
	});
	// browserSync will trigger livereload when build files are updated
	browserSync.init({
		// TODO: make these values passed in by `npm run dev`
		port: 8001,
		proxy: 'localhost:8000',
		files: ['build/*'],
	});
} else {
	// no watch flag, just build it and be done
	build();
}
