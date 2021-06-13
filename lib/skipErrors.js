'use strict';

/**
 * Catch and ignore errors in the callback
 * @param {Function} callback
 * @returns {Function}
 */
const skipErrors = (callback) => async(data) => {
	const {logError} = data;

	try {
		return await callback(data);
	} catch (error) {
		if (typeof logError === 'function') {
			logError(error.stack);
		}

		return data;
	}
};

module.exports = {
	skipErrors
};
