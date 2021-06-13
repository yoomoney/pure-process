'use strict';

const expect = require('expect');
const {pipeP, parallelMerge} = require('../flow');
const {exit} = require('../exits');

const EXIT_CODE = {
	earlyResult: 'earlyResult'
};

const stepA = (data) => ({
	...data,
	resultA: data.input + 1
});

const stepB = (data) => ({
	resultB: data.resultA * 2,
	resultB2: data.resultC
});

const stepC = (data) => ({
	resultC: data.resultA * 3,
	resultC2: data.resultB
});

it('composes flow', async() => {
	const result = await pipeP(
		stepA,
		parallelMerge(
			stepB,
			stepC
		)
	)({input: 1});

	expect(result).toEqual({
		input: 1,
		resultA: 2,
		resultB: 4,
		resultC: 6,
		resultB2: undefined,
		resultC2: undefined
	});
});

it('exits composed flow', async() => {
	const result = await pipeP(
		stepA,
		parallelMerge(
			stepB,
			stepC,
			() => exit(EXIT_CODE.earlyResult)
		),
		exit.pipe
	)({});

	expect(result).toEqual({
		exitCode: 'earlyResult'
	});
});
