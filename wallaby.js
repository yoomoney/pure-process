'use strict';

module.exports = () => ({
	files: [
		'lib/**/*.js',
		'!lib/**/*.spec.js'
	],
	tests: [
		'lib/**/*.spec.js'
	],
	env: {
		type: 'node'
	}
});
