import foo from './foo.js';
import { version, name } from '../../package.json';

export default function () {
  console.log(/*foo, */`version: ${version}`, name);
}
