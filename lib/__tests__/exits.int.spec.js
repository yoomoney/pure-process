'use strict';

const expect = require('expect');
const {exit} = require('../exits');

const EXIT_CODE = {
	earlyResult: 'earlyResult'
};

const stepA = (data) => ({
	...data,
	resultA: 'resultA'
});

const stepB = (data) => {
	if (data.early) {
		exit(EXIT_CODE.earlyResult, {
			ok: true
		});
	}

	return data;
};

const process = (data) => Promise.resolve(data)
	.then(stepA)
	.then(stepB)
	.then(...exit());

it('exits early', async() => {
	const output = await process({
		early: true
	});

	expect(output).toEqual({
		exitCode: 'earlyResult',
		ok: true
	});
});

it('exits late', async() => {
	const output = await process();

	expect(output).toEqual({
		exitCode: 'main',
		resultA: 'resultA'
	});
});
