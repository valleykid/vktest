import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.babel.js',
  format: 'cjs',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [ /*require.resolve('babel-preset-es2015')*/'es2015', { "modules": false }],
        /*require.resolve('babel-preset-stage-0')*/'stage-0'
      ]
    })
  ],
  dest: 'bundle-babel.js',
  sourceMap: true
};
