import typescript from '@rollup/plugin-typescript';
import run from '@rollup/plugin-run';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const PRODUCTION = !process.env.ROLLUP_WATCH;
const APP_NAME = 'MultiplatformEvents';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.browser,
				format: 'umd',
				name: APP_NAME,
				
			},
			{
				format: 'es',
				file: pkg.module,
			},
			{
				format: 'cjs',
				file: pkg.main,
			}
		],
		plugins: [
			typescript({
				exclude: '**/__tests__/**',
			}),
			PRODUCTION ? terser() : run(),
		],
	},
];
