'use strict';

const expect = require('expect');
const {
	exit,
	createExit,
	pipeP,
	parallelMerge,
	skipErrors
} = require('../index');

it('index reexports correctly', () => {
	expect(exit).toBeInstanceOf(Function);
	expect(createExit).toBeInstanceOf(Function);
	expect(pipeP).toBeInstanceOf(Function);
	expect(parallelMerge).toBeInstanceOf(Function);
	expect(skipErrors).toBeInstanceOf(Function);
});
