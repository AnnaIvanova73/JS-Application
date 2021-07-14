let {chromium} = require('playwright-chromium');
let {assert} = require('chai');

let page;
let browser;

describe('Test Book-Library', function () {
    this.timeout(120000)
    before(async function () {
        browser = await chromium.launch({headless: false, slowMo: 300});
    });
    after(async function () {
        await browser.close();
    });

    beforeEach(async function () {
        page = await browser.newPage();
    });

    afterEach(async function () {
        await page.close();
    });

    it('Testing: load books', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('body > table > tbody')

        let text = await page.$$eval('tbody > tr > td', e => {
            return Array.from(e).map(e => e.textContent)
        });
        assert.deepEqual(text, [
            "Harry Potter and the Philosopher's Stone",
            "J.K.Rowling",
            "\n                Edit\n                Delete\n            ",
            "C# Fundamentals",
            "Svetlin Nakov",
            "\n                Edit\n                Delete\n            "
        ])
    });

    it('Test: add book', async () => {
        await page.goto('http://localhost:3000');
        await Promise.all([
            await page.focus('input[name=title]'),
            await page.keyboard.type('Some title'),
            await page.focus('input[name=author]'),
            await page.keyboard.type('Some author'),
        ]);
        await page.click('text=Submit')
        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('body > table > tbody');

        let text = await page.$$eval('td', e => {
            let arr = Array.from(e).map(e => e.textContent)
            arr = arr.map(e => e.trim());
            return arr;
        });
        assert.deepEqual(text, [
            "Harry Potter and the Philosopher's Stone",
            "J.K.Rowling",
            "Edit\n                Delete",
            "C# Fundamentals",
            "Svetlin Nakov",
            "Edit\n                Delete",
            "Some title",
            "Some author",
            "Edit\n                Delete"
        ])

    });


    it('Test edit book', async () => {
        await page.goto('http://localhost:3000');

        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('body > table > tbody');

        await page.click('text=Some title Some author Edit Delete >> button');
        await page.$eval('#editForm', el => el.style.display)

        await page.$eval('#editForm input[name=title]', el => el.value = '1111111');
        await page.$eval('#editForm input[name=author]', el => el.value = '111111');

        await page.click('text=Save');

        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('body > table > tbody');

        let text = await page.$$eval('td', e => {
            let arr = Array.from(e).map(e => e.textContent.trim())
            arr = arr.map(e => e.trim());
            return arr.join(' ').replace(/\s\s+/g, ' ')
        });
        assert.strictEqual(text, `Harry Potter and the Philosopher's Stone J.K.Rowling Edit Delete C# Fundamentals Svetlin Nakov Edit Delete 1111111 111111 Edit Delete`);
    });

    it('Test delete book', async () => {
        await page.goto('http://localhost:3000');
        await page.click('text=LOAD ALL BOOKS');

        await page.waitForSelector('body > table > tbody');

        const id = await page.getAttribute('tbody tr:first-child', 'data-id')
        page.on('dialog', dialog => dialog.accept());

        const [request] = await Promise.all([
            page.waitForRequest(`**/jsonstore/collections/books/${id}`),
            page.click('text=Delete')
        ]);

        assert(request.method(),'DELETE')

        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('body > table > tbody');

        let text = await page.$$eval('td', e => {
            let arr = Array.from(e).map(e => e.textContent.trim())
            arr = arr.map(e => e.trim());
            return arr.join(' ').replace(/\s\s+/g, ' ')
        });
        assert.strictEqual(text, `C# Fundamentals Svetlin Nakov Edit Delete 1111111 111111 Edit Delete`);

    });
});