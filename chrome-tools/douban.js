'use strict';

const puppeteer = require('puppeteer');
const request = require('request');
const webp = require('webp-converter');
const path = require('path');
const fs = require('fs');

let loaded = {};

function timeout(delay) {
  return new Promise(
    (resolve, reject) => setTimeout(resolve, delay)
  );
}

function noop() {}

(async () => {
  const browser = await puppeteer.launch(/* { headless: false } */);
  const page = await browser.newPage();
  const isEnd = await loadPage(page, 'https://movie.douban.com/photos/photo/1417447915/#title-anchor');
  if (isEnd) await browser.close();
})();

function loadImg(src, dir = '') {
  const fileName = path.basename(src);
  const fileId = fileName.replace(/\D/g, '');
  const filePath = dir + fileName;
  // const dirName = path.dirname(src);
  if (loaded[`p${fileId}`]) return;
  if (!fs.existsSync(filePath) && !fs.existsSync(filePath.replace('webp', 'jpg'))) {
    request(src).pipe(fs.createWriteStream(filePath));
  }
  loaded[`p${fileId}`] = true;
  return filePath;
}

async function loadPage(page, url) {
  await page.goto(url);
  const picWrapper = await page.$('.mainphoto');
  const picWrapperHref = await page.evaluate(dom => dom.href, picWrapper);
  const pic = await page.$('.mainphoto img');
  const picSrc = await page.evaluate(dom => dom.src, pic);
  const title = await page.title() || '';
  const localPath = `${__dirname}/${'pic'}/`;
  let file;

  console.log(picWrapperHref, picSrc, title);
  
  if (!fs.existsSync(localPath)) {
    console.log('文件夹不存在，现在新建一个...');
    fs.mkdirSync(localPath);
  }
  if (picSrc) {
    file = loadImg(picSrc, localPath);
    /* request(picSrc, (error, res, body) => {
      // fs.createWriteStream(`${name}.jpg`)
      console.log(name);
      fs.writeFileSync(name, body);
    }); */
    await timeout(1 * 1000);
    if (path.extname(picSrc) === '.webp' && file) {
      webp.dwebp(file, file.replace('webp', 'jpg'), '-o', status => {
        if (status.slice(0, 3) == 100) fs.unlink(file);
      });
    }
  }
  if (picWrapperHref) {
    // await page.click('.mainphoto');
    if (file) {
      console.log(/* file,  */'continue...\n');
      return loadPage(page, picWrapperHref);
    }
    await page.close();
  }
  return file ? false : true;
}