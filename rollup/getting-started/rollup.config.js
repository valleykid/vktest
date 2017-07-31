import json from 'rollup-plugin-json';

export default {
  entry: 'src/native-dependence/main.js',
  format: 'umd',
  moduleName: 'icat',
  plugins: [
    json()
  ],
  dest: 'bundle.js' // equivalent to --output
};
