'use strict';

const DEFAULT_EXIT_CODE = 'main';

class ExitProcessError extends Error {
	constructor(exitCode, output) {
		super(
			`Process exited with code "${exitCode}". ` +
			'If you see this error, add ".then(...exit())" to the last Promise.'
		);
		this.name = 'ExitProcessError';
		this.exitCode = exitCode;
		this.output = output;
	}
}

const validateOutput = (output) => {
	const outputIsUndefined = typeof output === 'undefined';
	const outputIsObject = typeof output === 'object' && output;

	if (!outputIsUndefined && !outputIsObject) {
		throw Error('Output data must be Object or undefined');
	}

	if (outputIsObject &&
		typeof output['exitCode'] !== 'undefined') {
		throw Error('"exitCode" key must not be present in output data');
	}
};

const handleThen = (output) => {
	validateOutput(output);
	return {
		...output,
		exitCode: DEFAULT_EXIT_CODE
	};
};

const handleCatch = (error) => {
	if (error instanceof ExitProcessError) {
		return {
			...error.output,
			exitCode: error.exitCode
		}
	}
	throw error;
}

/**
 * Exits the Promise chain by throwing an exception.
 * Don't forget to add `.then(...exit())` to the last Promise.
 * @param {string} [exitCode] Exit code is added to the output object
 * @param {object} [output] Additional output properties
 * @throws {ExitProcessError|*}
 */
const exit = (exitCode, output) => {
	if (typeof exitCode === 'string') {
		validateOutput(output);
		throw new ExitProcessError(exitCode, output);
	}

	if (typeof exitCode !== 'undefined') {
		throw Error('Invalid argument. Use "exit(code)" or ".then(...exit())".');
	}

	return [handleThen, handleCatch];
};

exit.pipe = [handleThen, handleCatch];

/**
 * Returns `exit` function.
 * Used for typing only.
 * @returns {Function}
 */
const createExit = () => exit;

module.exports = {
	exit,
	createExit
};
