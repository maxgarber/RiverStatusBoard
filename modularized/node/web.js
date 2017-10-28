//
//	
//
console.log('web.js loaded successfully');

requirejs.config({
	baseUrl: './node_modules/'
});

console.log('loading module foo…');

require(['foo'], function (foo) {
	if (foo !== 'undefined') {
		console.log('loaded foo…');
		console.log('foo.bar() => ' + foo.bar());
	}
});

