//
//	NodeMode
//

var foo = require('foo');
var Utilities = require('Utilities');

console.log('foo = ' + foo);
if (foo.bar !== 'undefined') {
	console.log('foo.bar() -> ' + foo.bar());
}

console.log('Utilities = ' + Utilities);
if (Utilities !== 'undefined') {
	console.log('Utilities.meta = ' + Utilities.meta);
}

// EOF
