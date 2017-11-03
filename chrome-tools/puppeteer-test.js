'use strict';

const puppeteer = require('puppeteer');

function timeout(delay) {
  return new Promise((resolve, reject) => setTimeout(resolve, delay));
}

(async () => {
  const browser = await puppeteer.launch({
    // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
    // headless: false,
    // timeout: 30000, // 默认超时为30秒，设置为0则表示不设置超时
    // executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
  });
  const page = await browser.newPage();

  await page.goto('https://www.taobao.com');
  // const bodyHandle = await page.$('body');
  // console.log(bodyHandle.offsetWidth, bodyHandle.offsetHeight);
  // page.setViewport({
  //   width: bodyHandle.offsetWidth,
  //   height: bodyHandle.offsetHeight
  // });
  const dimensions = await page.evaluate(() => {
    document.body.scrollTop = 1000;
    return {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight
    };
  });
  // console.log('Dimensions:', dimensions);
  page.setViewport({ ...dimensions, width: 1440 });
  // await timeout(1 * 1000);
  await page.waitForSelector('.hotsale-end');
  await page.waitFor(100);
  // await page.mouse.move(0, 1000);
  await page.screenshot({path: 'taobao.png', fullPage: true});
  // await page.waitFor(10 * 1000);
  await browser.close();

  /* page.setViewport({
    width: 1376,
    height: 768,
  });
  await page.goto('https://www.google.com.hk', {
    waitUntil: 'networkidle',
  });
  // const bodyHandle = await page.$('body');
  // const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
  // await bodyHandle.dispose();
  // console.log('bodyInnerHTML:', bodyInnerHTML);
  await page.focus('#lst-ib');
  // await page.type('#lst-ib', 'node', {
  //   delay: 1000,
  // });
  await page.keyboard.type('node fiber', { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitFor(1 * 1000);
  await page.click('#ires .rc a'); //tap
  await page.waitFor(60 * 1000);
  await browser.close(); */

  /* await page.goto('https://www.taobao.com');
  await page.emulateMedia('print');
  await page.pdf({
    path: 'taobao.pdf',
    format: 'A4'
  });
  await browser.close(); */
})();