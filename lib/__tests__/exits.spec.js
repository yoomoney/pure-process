'use strict';

const expect = require('expect');
const {exit, createExit} = require('../exits');

const NOT_SUPPORTED_OUTPUT = [null, false, true, '', 1, NaN];

const EXIT_CODE = {
	codeKey: 'codeValue',
	codeKey2: 'codeValue2'
};

describe('exit', () => {
	it('throws if exitCode is passed', () => {
		expect(() =>
			exit(EXIT_CODE.codeKey)
		).toThrow();
	});

	it('throws if early exit output is not supported', () => {
		NOT_SUPPORTED_OUTPUT.forEach((output) => {
			expect(() =>
				exit(EXIT_CODE.codeKey, output)
			).toThrow('Output data must be Object or undefined');
		});
	});

	it('throws if exitCode key is present in output', () => {
		expect(() =>
			exit(EXIT_CODE.codeKey, {exitCode: 1})
		).toThrow('"exitCode" key must not be present in output data')
	});

	it('error has correct fields', () => {
		const output = {};

		try {
			exit(EXIT_CODE.codeKey, output);
		} catch (error) {
			expect(error.message).toBe(
				'Process exited with code "codeValue". ' +
				'If you see this error, add ".then(...exit())" to the last Promise.'
			);
			expect(error.name).toBe('ExitProcessError');
			expect(error.exitCode).toBe('codeValue');
			expect(error.output).toBe(output);
		}
	});

	it('throws if exit is called with invalid argument', () => {
		expect(() =>
			exit({})
		).toThrow('Invalid argument. Use "exit(code)" or ".then(...exit())".')
	});

	it('throws if Promise output is not supported', () => {
		NOT_SUPPORTED_OUTPUT.forEach((output) => {
			expect(() =>
				exit()[0](output)
			).toThrow('Output data must be Object or undefined')
		});
	});

	it('throws if exitCode key is present in Promise output', () => {
		expect(() =>
			exit()[0]({exitCode: 1})
		).toThrow('"exitCode" key must not be present in output data')
	});

	it('adds exitCode to Promise object output', () => {
		expect(
			exit()[0]({
				sample: 1
			})
		).toEqual({
			sample: 1,
			exitCode: 'main'
		});
	});

	it('adds exitCode to Promise undefined output', () => {
		expect(
			exit()[0]()
		).toEqual({
			exitCode: 'main'
		});
	});

	it('adds exitCode to early exit object output', () => {
		try {
			exit(EXIT_CODE.codeKey, {
				sample: 1
			});
		} catch (error) {
			expect(
				exit()[1](error)
			).toEqual({
				sample: 1,
				exitCode: 'codeValue'
			});
		}
	});

	it('adds exitCode to early exit undefined output', () => {
		try {
			exit(EXIT_CODE.codeKey);
		} catch (error) {
			expect(
				exit()[1](error)
			).toEqual({
				exitCode: 'codeValue'
			});
		}
	});

	it('early exit handler rethrows unknown errors', () => {
		const unknownError = new Error('Unknown');

		return Promise.reject(unknownError)
			.catch(exit()[1])
			.catch((error) => {
				if (error !== unknownError) {
					throw unknownError;
				}
			});
	});

	it('has pipe property with handlers', () => {
		expect(exit()).toStrictEqual(exit.pipe);
	});
});

describe('createExit', () => {
	it('returns exit', () => {
		expect(createExit()).toBe(exit);
	});
});
