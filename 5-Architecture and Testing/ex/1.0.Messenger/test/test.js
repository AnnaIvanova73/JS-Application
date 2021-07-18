const {chromium} = require('playwright-chromium');
let {assert} = require('chai');

let browser;
let page;

describe('Tests', function () {
    this.timeout(12000);

    before(async function () {
        browser = await chromium.launch({headless: false})
    });
    after(async function () {
        browser.close();
    });
    beforeEach(async function () {
        page = await browser.newPage();
    });
    afterEach(async function () {
        await page.close()
    });

    it('Testing: load messages ', async () => {
        await page.goto('http://localhost:3000')
        await page.click('text=Refresh');
        let textAfterRefresh = await page.$eval('textarea', e => e.value);
        assert.strictEqual(textAfterRefresh, 'Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))')

    });
    it('Testing: send message ', async () => {
        await page.goto('http://localhost:3000')

        await Promise.all([
            await page.focus('#author'),
            await page.keyboard.type('Some name'),
            await page.focus('#content'),
            await page.keyboard.type('Some content'),
        ])

        await page.click('text=Send');
        await page.click('text=Refresh');
        let textAfterRefresh = await page.$eval('textarea', e => e.value);
        assert.strictEqual(textAfterRefresh, 'Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))\n' +
            'Some name: Some content')
    });

});

