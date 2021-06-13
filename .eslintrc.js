'use strict';

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:node/recommended'
	],
	env: {
		es2020: true,
		node: true,
		mocha: true
	}
};
