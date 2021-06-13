'use strict';

const expect = require('expect');
const {skipErrors} = require('../skipErrors');

describe('skipErrors', () => {
	it('passes data to callback', async() => {
		let product = 1;

		await skipErrors((a) => {
			product += a;
		})(3);

		expect(product).toBe(4);
	});

	it('returns callback result', async() => {
		const result = await skipErrors(
			(a) => a + 1
		)(3);

		expect(result).toBe(4);
	});

	it('returns data if callback throws', async() => {
		const data = {};
		const result = await skipErrors(() => {
			throw Error();
		})(data);

		expect(result).toBe(data);
	});

	it('does not call logError if callback succeeds', () => {
		return skipErrors(
			() => null
		)({
			logError: () => {
				throw Error();
			}
		});
	});

	it('calls logError if callback throws', async() => {
		let called = false;

		await skipErrors(
			() => {
				throw Error();
			}
		)({
			logError: (stack) => {
				expect(typeof stack).toBe('string');
				expect(stack).toBeTruthy();
				called = true;
			}
		});

		expect(called).toBe(true);
	});
});
