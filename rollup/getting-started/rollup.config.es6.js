import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.es6',
  format: 'iife',
  moduleName: 'vktest',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  dest: 'bundle-es6.js'
};
