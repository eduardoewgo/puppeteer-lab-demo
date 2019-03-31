'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});

    await page.goto('https://www.centennialcollege.ca/');

    // Type into search box.
    await page.type('#txtSearch', 'Software Engineering');
    await page.click('#btnSearch');
    await page.waitForNavigation();

    let course = await page.evaluate(() => {
        let divs = page.$$eval('div.gsc-expansionArea > div.gsc-result');
        console.log(divs);
    });

    await browser.close();
})();