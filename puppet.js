'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});

    await page.goto('https://www.centennialcollege.ca/');

    // Type into search box.
    await page.type('#txtSearch', 'Software Engineering');
    await page.click('#btnSearch');
    await page.waitForNavigation();

    // SS time!
    await page.screenshot({path: `results/ce-${new Date().getTime()}.png`, fullPage: true});

    // Fetching values
    let list = await page.$$('div.gsc-expansionArea > div.gsc-webResult.gsc-result');
    let results = [];

    for (let el of list) {
        let result = {};
        result.name = await el.$eval('a.gs-title', a => a.innerText);
        result.link = await el.$eval('a.gs-title', a => a.href);
        results.push(result);
    }

    // Compare with expected result
    console.log(results);

    await browser.close();
})();