'use strict';

const expect = require('expect');
const {pipeP, parallelMerge} = require('../flow');

describe('pipeP', () => {
	it('throws if no functions passed', () => {
		expect(() =>
			pipeP()
		).toThrow('No arguments passed')
	});

	it('promisifies first function', () => {
		return expect(
			pipeP(() => 'hello')()
		).resolves.toBe('hello')
	});

	it('passes multiple arguments to first function', async() => {
		let result;
		await pipeP((a, b, c) => {
			result = a + b + c;
		})(1, 2, 3);

		expect(result).toBe(6);
	});

	it('executes functions sequentially', async() => {
		let function1Called = false;
		let function2Called = false;
		let function3Called = false;

		await pipeP(
			() => {
				expect(function1Called).toBe(false);
				expect(function2Called).toBe(false);
				expect(function3Called).toBe(false);
				function1Called = true;
			},
			() => {
				expect(function1Called).toBe(true);
				expect(function2Called).toBe(false);
				expect(function3Called).toBe(false);
				function2Called = true;
			},
			() => {
				expect(function1Called).toBe(true);
				expect(function2Called).toBe(true);
				expect(function3Called).toBe(false);
				function3Called = true;
			}
		)();

		expect(function1Called).toBe(true);
		expect(function2Called).toBe(true);
		expect(function3Called).toBe(true);
	});

	it('passes parameters between functions', async() => {
		const result = await pipeP(
			(arg) => {
				expect(arg).toBe(1);
				return 2;
			},
			(arg) => {
				expect(arg).toBe(2);
				return 3;
			},
			(arg) => {
				expect(arg).toBe(3);
				return 4;
			},
		)(1);

		expect(result).toBe(4);
	});

	it('arrays of functions are passed to "then"', async() => {
		const result = await pipeP(
		() => 'hello',
			[(input) => input]
		)();

		expect(result).toBe('hello');
	});

	it('empty arrays are equivalent to "then" without arguments', async() => {
		const result = await pipeP(
			() => 'hello',
			[]
		)();

		expect(result).toBe('hello');
	});

	it('second function in array is used as "catch"', async() => {
		const result = await pipeP(
			() => {
				throw Error('Something went wrong')
			},
			[null, (error) => {
				expect(error.message).toBe('Something went wrong');
				return 'All ok';
			}]
		)();

		expect(result).toBe('All ok');
	});

	it('arrays cannot be passed as first argument', () => {
		return expect(() =>
			pipeP([])()
		).rejects.toThrow('firstFunc is not a function');
	});
});

describe('parallelMerge', () => {
	it('merges results', async() => {
		const result = await parallelMerge(
			() => ({out1: 1}),
			() => ({out2: 2}),
			() => ({out3: 3}),
		)({init: 0});

		expect(result).toEqual({
			init: 0,
			out1: 1,
			out2: 2,
			out3: 3
		});
	});

	it('resolves with first argument if no functions passed', async() => {
		const arg = 'hello';
		const result = await parallelMerge()(arg);
		expect(result).toBe(arg);
	});

	it('works without initial arguments', async() => {
		const result = await parallelMerge(
			() => ({out1: 1}),
			() => ({out2: 2})
		)();
		expect(result).toEqual({
			out1: 1,
			out2: 2
		});
	});

	it('passes multiple arguments to all functions', () => {
		const checkArguments = (a, b, c) => {
			expect(a).toBe(1);
			expect(b).toBe(2);
			expect(c).toBe(3);
		}

		return parallelMerge(
			checkArguments,
			checkArguments,
			checkArguments
		)(1, 2, 3);
	});

	it('merges shallowly', async() => {
		const result = await parallelMerge(
			() => ({out: {inner: 1}}),
			() => ({out: {inner: 2}})
		)({out: {inner: 0}});

		expect(result).toEqual({
			out: {inner: 2}
		});
	});

	it('runs functions in parallel', async() => {
		let call11 = false;
		let call12 = false;
		let call21 = false;
		let call22 = false;
		let call31 = false;
		let call32 = false;

		await parallelMerge(
			() => Promise.resolve()
				.then(() => {
					call11 = true;
				})
				.then(() => {
					expect(call11).toBe(true);
					expect(call12).toBe(false);
					expect(call21).toBe(true);
					expect(call22).toBe(false);
					expect(call31).toBe(true);
					expect(call32).toBe(false);
					call12 = true;
				}),
			() => Promise.resolve()
				.then(() => {
					call21 = true;
				})
				.then(() => {
					expect(call11).toBe(true);
					expect(call12).toBe(true);
					expect(call21).toBe(true);
					expect(call22).toBe(false);
					expect(call31).toBe(true);
					expect(call32).toBe(false);
					call22 = true;
				}),
			() => Promise.resolve()
				.then(() => {
					call31 = true;
				})
				.then(() => {
					expect(call11).toBe(true);
					expect(call12).toBe(true);
					expect(call21).toBe(true);
					expect(call22).toBe(true);
					expect(call31).toBe(true);
					expect(call32).toBe(false);
					call32 = true;
				})
		)();
	});
});
