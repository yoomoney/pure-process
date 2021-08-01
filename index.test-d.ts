import {expectType, expectAssignable, expectError} from 'tsd';
import {createExit, pipeP, parallelMerge, skipErrors} from './index';

type MainExit = {exitCode: 'main'} & {bye: string}

type OkExit = {
	exitCode: 'ok',
	hello?: string
}

const exit = createExit<OkExit>();
const handleThen = exit()[0];
const handleCatch = exit()[1];
const output = await Promise.resolve({bye: 'bye'}).then(...exit());

// createExit
expectError(createExit<{}>());

// exit
expectType<never>(exit('ok'));
expectType<never>(exit('ok', {hello: 'there'}));
expectError(exit('ok', {hello: 123}))
expectError(exit('ok', {hello: 'there', exitCode: 'oops'}));
expectError(exit('nope'));

// handleThen
expectType<{exitCode: 'main'}>(handleThen(undefined));
expectType<MainExit>(handleThen({bye: 'bye'}));
expectError(handleThen({bye: 'bye', exitCode: 'oops'}));
expectError(await Promise.resolve({bye: 'bye', exitCode: 'oops'}).then(...exit()));

// handleCatch
expectType<OkExit>(handleCatch('oops'));

// Inference
expectType<MainExit | OkExit>(output);

if (output.exitCode === 'ok') {
	expectType<OkExit>(output);
} else {
	expectType<MainExit>(output);
}

// pipeP
expectType<number>(await pipeP(() => 1)());
expectType<number>(await pipeP((a: number) => 1)(2));
expectType<number>(await pipeP((a: number) => Promise.resolve(1))(2));
expectType<(a: number) => Promise<number>>(await pipeP((a: number) => 1));

expectType<number>(await pipeP(
	(a: number) => '1',
	(a: string) => 1
)(2));
expectType<number>(await pipeP(
	(a: number) => Promise.resolve('1'),
	(a: string) => Promise.resolve(1)
)(2));
expectType<(a: number) => Promise<number>>(await pipeP(
	(a: number) => '1',
	(a: string) => 1
));
expectType<MainExit | OkExit>(await pipeP(
	(a: number) => ({bye: 'bye'}),
	exit.pipe
)(2));
expectType<{exitCode: 'main'} | OkExit>(await pipeP(
	(a: number) => undefined,
	exit.pipe
)(2));

expectType<string>(await pipeP(
	(a: number) => '1',
	(a: string) => 1,
	(a: number) => '1'
)(2));
expectType<string>(await pipeP(
	(a: number) => Promise.resolve('1'),
	(a: string) => Promise.resolve(1),
	(a: number) => Promise.resolve('1')
)(2));
expectType<MainExit | OkExit>(await pipeP(
	(a: number) => '1',
	(a: string) => ({bye: 'bye'}),
	exit.pipe
)(2));

expectError(await pipeP((a: number) => 1)('2'));
expectError(await pipeP(
	(a: number) => 1,
	(a: string) => 1
)(2));

// parallelMerge
expectType<{out1: number}>(
	await parallelMerge(() => ({out1: 1}))());
expectType<{out1: number} & {init: number}>(
	await parallelMerge((a: {init: number}) => ({out1: 1}))({init: 0}));
expectType<{out1: number} & {init: number}>(
	await parallelMerge((a: {init: number}) => Promise.resolve({out1: 1}))({init: 0}));
expectAssignable<{init: string}>(
	await parallelMerge((a: {init: number}) => Promise.resolve({init: '1'}))({init: 0}));
expectAssignable<{init: number}>(
	await parallelMerge((a: {init: number}) => {})({init: 0}));

expectAssignable<{a: string} & {b: number} & {c: number}>(
	await parallelMerge(
		() => ({a: '1', b: '1'}),
		() => ({b: 1, c: 1})
	)());
expectAssignable<{a: number} & {b: string} & {c: string} & {d: string} & {e: number} & {f: number}>(
	await parallelMerge(
		(a: {a: number, b: number, c: number}) => ({b: '1', d: 1, e: 1}),
		(a: {a: number, b: number, c: number}) => ({c: '1', d: '1', f: 1})
	)({a: 0, b: 0, c: 0}));
expectAssignable<{a: number} & {b: string} & {c: string} & {d: string} & {e: number} & {f: number}>(
	await parallelMerge(
		(a: {a: number, b: number, c: number}) => Promise.resolve({b: '1', d: 1, e: 1}),
		(a: {a: number, b: number, c: number}) => Promise.resolve({c: '1', d: '1', f: 1})
	)({a: 0, b: 0, c: 0}));

expectAssignable<MainExit & {a: number} | OkExit>(await pipeP(
	(a: number) => '1',
	(a: string) => 1,
	(a: number) => '1',
	parallelMerge(
		(a: string) => ({bye: 'bye'}),
		(a: string) => ({a: 1})
	),
	exit.pipe
)(2));

expectError<{out1: number}>(
	await parallelMerge(() => ({out1: 1}))({init: 0}));
expectError<{out1: number} & {init: number}>(
	await parallelMerge((a: {init: number}) => ({out1: 1}))());

// skipErrors
expectType<Promise<number>>(skipErrors((a: number) => 1)(2));
expectType<Promise<number>>(skipErrors((a: number) => Promise.resolve(1))(2));

expectType<number | string>(await pipeP(
	(a: number) => '1',
	skipErrors((a: string) => 1)
)(2));

expectType<MainExit | OkExit | {exitCode: 'main'} & {hello: string}>(await pipeP(
	(a: number) => ({hello: 'there'}),
	skipErrors((a: {hello: string}) => ({bye: 'bye'})),
	exit.pipe
)(2));

expectType<MainExit | OkExit>(await pipeP(
	(a: number) => ({hello: 'there'}),
	skipErrors((a: {hello: string}) => ({bye: 'bye'})),
	(a: {hello: string} | {bye: string}) => ({bye: 'bye'}),
	exit.pipe
)(2));
