'use strict';

/**
 * Returns a function executing Promise-returning
 * argument functions sequentially, from left to right.
 *
 * The first function is of arbitrary arity,
 * others are of arity 1.
 *
 * @param {...(Function|Function[])} functions
 * @returns {Function}
 */
const pipeP = (...functions) => {
	if (!functions.length) {
		throw Error('No arguments passed');
	}

	const firstFunc = functions[0];
	const restFuncs = functions
		.slice(1)
		.map((func) => Array.isArray(func)
			? func
			: [func, undefined]
		);

	return function(...initialArgs) {
		return restFuncs.reduce(
			(acc, [thenFunc, catchFunc]) => {
				thenFunc = typeof thenFunc === 'function' ? thenFunc.bind(this) : thenFunc;
				catchFunc = typeof catchFunc === 'function' ? catchFunc.bind(this) : catchFunc;
				return acc.then(thenFunc, catchFunc);
			},
			Promise.resolve()
				.then(() => firstFunc.apply(this, initialArgs))
		);
	};
}

/**
 * Returns a function executing Promise-returning
 * argument functions in parallel.
 *
 * Each function receives initial arguments.
 * Returns first argument, shallow-merged with
 * return values of each function.
 *
 * @param {...Function} functions
 * @returns {Function}
 */
const parallelMerge = (...functions) =>
	function(...initialArgs) {
		return Promise.resolve()
			.then(() => Promise.all(
				functions.map((func) => func.apply(this, initialArgs))
			))
			.then((results) => (
				results.reduce(
					(acc, result) => ({
						...acc,
						...result
					}),
					initialArgs[0]
				)
			));
	};

module.exports = {
	pipeP,
	parallelMerge
};
