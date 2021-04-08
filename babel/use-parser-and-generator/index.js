'use strict';

const { parse } = require('@babel/parser');
const { default: generate } = require('@babel/generator');
const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('https://gw.alipayobjects.com/a/g/thead-web/occ-mobile/flex.b9ebf88e.js');
    const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    const code = await res.text();
    // console.log(`Got code: ${code}`);

    const ast = parse(code);
    console.log('--------', ast);

    const output = generate(ast, { minified: true }, code);
    console.log('-------', output);
  } catch (err) {
    console.log(err.message); // can be console.error
  }
})();
