import '../scss/styles.scss'; // just to allow esbuild to grab it ...
// if we try to give sass its own entry point, esbuild will fail since it has no sass loader.
// only css is a first-class citizen in esbuild right now. if we were to not use sass but instead
// just do css with custom properties (variables) - hint, hint – then we could do a css entry point

document.body.style.backgroundColor = 'darkslategrey';
document.body.querySelector('#greeting').textContent =
	'Howdy – text and colors replaced by js';
