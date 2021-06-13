type EarlyOutput<ExitUnion, Code> =
	Omit<
		Extract<ExitUnion, {exitCode: Code}>,
		'exitCode'
	> & {exitCode?: never};

type PromiseOutput = {
	exitCode?: never;
	[index: string]: unknown;
};

/**
 * Creates a function which exits the Promise chain by throwing an exception.
 * Don't forget to add `.then(...exit())` to the last Promise.
 */
export function createExit<ExitUnion extends {exitCode: string}>(): {
	<Code extends ExitUnion['exitCode']>(exitCode: Code, output?: EarlyOutput<ExitUnion, Code>): never;
	(): [
		<T extends PromiseOutput | void>(promiseOutput: T) => T extends void
			? {exitCode: 'main'}
			: T & {exitCode: 'main'},
		(error: unknown) => ExitUnion
	];
	pipe: <T extends PromiseOutput | void>(promiseOutput: T) => T extends void
		? {exitCode: 'main'} | ExitUnion
		: T & {exitCode: 'main'} | ExitUnion,
}

type PFnMulti<A extends any[], R> = (...args: A) => R | Promise<R>;
type PFn<A, R> = (a: A) => R | Promise<R>;

/**
 * Returns a function executing Promise-returning
 * argument functions sequentially, from left to right.
 *
 * The first function is of arbitrary arity,
 * others are of arity 1.
 */
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>, f16: PFn<R15, R16>, f17: PFn<R16, R17>, f18: PFn<R17, R18>, f19: PFn<R18, R19>, f20: PFn<R19, R20>): (...args: A) => Promise<R19>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>, f16: PFn<R15, R16>, f17: PFn<R16, R17>, f18: PFn<R17, R18>, f19: PFn<R18, R19>, f20: PFn<R19, R20>, ...func: PFn<any, any>[]): (...args: A) => Promise<any>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>, f16: PFn<R15, R16>, f17: PFn<R16, R17>, f18: PFn<R17, R18>, f19: PFn<R18, R19>): (...args: A) => Promise<R19>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>, f16: PFn<R15, R16>, f17: PFn<R16, R17>, f18: PFn<R17, R18>): (...args: A) => Promise<R18>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>, f16: PFn<R15, R16>, f17: PFn<R16, R17>): (...args: A) => Promise<R17>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>, f16: PFn<R15, R16>): (...args: A) => Promise<R16>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>, f15: PFn<R14, R15>): (...args: A) => Promise<R15>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>, f14: PFn<R13, R14>): (...args: A) => Promise<R14>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>, f13: PFn<R12, R13>): (...args: A) => Promise<R13>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>, f12: PFn<R11, R12>): (...args: A) => Promise<R12>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>, f11: PFn<R10, R11>): (...args: A) => Promise<R11>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>, f10: PFn<R9, R10>): (...args: A) => Promise<R10>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>, f9: PFn<R8, R9>): (...args: A) => Promise<R9>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7, R8>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>, f8: PFn<R7, R8>): (...args: A) => Promise<R8>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6, R7>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>, f7: PFn<R6, R7>): (...args: A) => Promise<R7>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5, R6>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>, f6: PFn<R5, R6>): (...args: A) => Promise<R6>;
export function pipeP<A extends any[], R1, R2, R3, R4, R5>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>, f5: PFn<R4, R5>): (...args: A) => Promise<R5>;
export function pipeP<A extends any[], R1, R2, R3, R4>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>, f4: PFn<R3, R4>): (...args: A) => Promise<R4>;
export function pipeP<A extends any[], R1, R2, R3>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>, f3: PFn<R2, R3>): (...args: A) => Promise<R3>;
export function pipeP<A extends any[], R1, R2>(f1: PFnMulti<A, R1>, f2: PFn<R1, R2>): (...args: A) => Promise<R2>;
export function pipeP<A extends any[], R1>(f1: PFnMulti<A, R1>): (...args: A) => Promise<R1>;

type FilterObject<T> = T extends object ? T : object;
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type FilterThen<T> = FilterObject<ThenArg<T>>;

type OmitThen<T1, T2 = object, T3 = object, T4 = object, T5 = object, T6 = object, T7 = object, T8 = object, T9 = object, T10 = object, T11 = object> =
	Omit<FilterThen<T1>, keyof FilterThen<T2> | keyof FilterThen<T3> | keyof FilterThen<T4> | keyof FilterThen<T5>
		| keyof FilterThen<T6> | keyof FilterThen<T7> | keyof FilterThen<T8> | keyof FilterThen<T9> | keyof FilterThen<T10>
		| keyof FilterThen<T11>>;

/**
 * Returns a function executing Promise-returning
 * argument functions in parallel.
 *
 * Each function receives initial arguments.
 * Returns first argument, shallow-merged with
 * return values of each function.
 */
export function parallelMerge<A, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4, f5: (data: A) => R5, f6: (data: A) => R6, f7: (data: A) => R7, f8: (data: A) => R8, f9: (data: A) => R9, f10: (data: A) => R10):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
		& OmitThen<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>
		& OmitThen<R2, R3, R4, R5, R6, R7, R8, R9, R10>
		& OmitThen<R3, R4, R5, R6, R7, R8, R9, R10>
		& OmitThen<R4, R5, R6, R7, R8, R9, R10>
		& OmitThen<R5, R6, R7, R8, R9, R10>
		& OmitThen<R6, R7, R8, R9, R10>
		& OmitThen<R7, R8, R9, R10>
		& OmitThen<R8, R9, R10>
		& OmitThen<R9, R10>
		& FilterThen<R10>
	>;
export function parallelMerge<A, R1, R2, R3, R4, R5, R6, R7, R8, R9>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4, f5: (data: A) => R5, f6: (data: A) => R6, f7: (data: A) => R7, f8: (data: A) => R8, f9: (data: A) => R9):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4, R5, R6, R7, R8, R9>
		& OmitThen<R1, R2, R3, R4, R5, R6, R7, R8, R9>
		& OmitThen<R2, R3, R4, R5, R6, R7, R8, R9>
		& OmitThen<R3, R4, R5, R6, R7, R8, R9>
		& OmitThen<R4, R5, R6, R7, R8, R9>
		& OmitThen<R5, R6, R7, R8, R9>
		& OmitThen<R6, R7, R8, R9>
		& OmitThen<R7, R8, R9>
		& OmitThen<R8, R9>
		& FilterThen<R9>
	>;
export function parallelMerge<A, R1, R2, R3, R4, R5, R6, R7, R8>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4, f5: (data: A) => R5, f6: (data: A) => R6, f7: (data: A) => R7, f8: (data: A) => R8):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4, R5, R6, R7, R8>
		& OmitThen<R1, R2, R3, R4, R5, R6, R7, R8>
		& OmitThen<R2, R3, R4, R5, R6, R7, R8>
		& OmitThen<R3, R4, R5, R6, R7, R8>
		& OmitThen<R4, R5, R6, R7, R8>
		& OmitThen<R5, R6, R7, R8>
		& OmitThen<R6, R7, R8>
		& OmitThen<R7, R8>
		& FilterThen<R8>
	>;
export function parallelMerge<A, R1, R2, R3, R4, R5, R6, R7>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4, f5: (data: A) => R5, f6: (data: A) => R6, f7: (data: A) => R7):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4, R5, R6, R7>
		& OmitThen<R1, R2, R3, R4, R5, R6, R7>
		& OmitThen<R2, R3, R4, R5, R6, R7>
		& OmitThen<R3, R4, R5, R6, R7>
		& OmitThen<R4, R5, R6, R7>
		& OmitThen<R5, R6, R7>
		& OmitThen<R6, R7>
		& FilterThen<R7>
	>;
export function parallelMerge<A, R1, R2, R3, R4, R5, R6>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4, f5: (data: A) => R5, f6: (data: A) => R6):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4, R5, R6>
		& OmitThen<R1, R2, R3, R4, R5, R6>
		& OmitThen<R2, R3, R4, R5, R6>
		& OmitThen<R3, R4, R5, R6>
		& OmitThen<R4, R5, R6>
		& OmitThen<R5, R6>
		& FilterThen<R6>
	>;
export function parallelMerge<A, R1, R2, R3, R4, R5>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4, f5: (data: A) => R5):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4, R5>
		& OmitThen<R1, R2, R3, R4, R5>
		& OmitThen<R2, R3, R4, R5>
		& OmitThen<R3, R4, R5>
		& OmitThen<R4, R5>
		& FilterThen<R5>
	>;
export function parallelMerge<A, R1, R2, R3, R4>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3, f4: (data: A) => R4):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3, R4>
		& OmitThen<R1, R2, R3, R4>
		& OmitThen<R2, R3, R4>
		& OmitThen<R3, R4>
		& FilterThen<R4>
	>;
export function parallelMerge<A, R1, R2, R3>(f1: (data: A) => R1, f2: (data: A) => R2, f3: (data: A) => R3):
	(data: A) => Promise<
		OmitThen<A, R1, R2, R3>
		& OmitThen<R1, R2, R3>
		& OmitThen<R2, R3>
		& FilterThen<R3>
	>;
export function parallelMerge<A, R1, R2>(f1: (data: A) => R1, f2: (data: A) => R2):
	(data: A) => Promise<
		OmitThen<A, R1, R2>
		& OmitThen<R1, R2>
		& FilterThen<R2>
	>;
export function parallelMerge<A, R1>(f1: (data: A) => R1):
	(data: A) => Promise<
		OmitThen<A, R1>
		& FilterThen<R1>
	>;
export function parallelMerge<A>(...f: ((data: A) => any)[]):
	(data: A) => Promise<any>;

/**
 * Catch and ignore errors in the callback
 */
export function skipErrors<T extends (data: any) => any>(callback: T):
	T extends (data: infer D) => Promise<infer R>
	? (data: D) => Promise<D | R>
	: T extends (data: infer D) => infer R
	? (data: D) => Promise<D | R>
	: never;
