import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
export default [
	{
		input: 'src/index.ts',
		output: {
			name: 'index',
			file: pkg.browser,
			format: 'umd'
        },
        plugins: [
            typescript()
        ]
	},
];