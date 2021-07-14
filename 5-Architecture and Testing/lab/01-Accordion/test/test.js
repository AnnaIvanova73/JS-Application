const {chromium} = require('playwright-chromium');
const {expect, assert} = require('chai');
const {test} = require('@playwright/test');

let browser;
let page;

describe('Softuni tests', function () {
    this.timeout(1000000);

    before(async () => {
        browser = await chromium.launch({headless: false});
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('Scalable Vector Graphics test', async () => {

        await page.goto('http://localhost:3000/');

        await page.click('text=More');
        let text = await page.textContent('p');
        assert.strictEqual(text,`Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.`);


        let btn = await page.textContent('text=Less');
        assert.strictEqual(btn,'Less')
        await page.click('text=Less');
    });

    it('Test paragraphs and btn value', async () => {

        await page.goto('http://localhost:3000/');


        let buttonsBeforeClick = await page.evaluate(() => {
            let sectionMain = document.querySelectorAll('#main button');
            return Array.from(sectionMain).reduce((acc, el) => {
                acc.push(el.textContent);
                return acc;
            }, [])
        });
        assert.deepEqual(buttonsBeforeClick, [ 'More', 'More', 'More', 'More' ]);


        await page.click('text=ALGOL More >> button');
        await page.click('text=Unix More >> button');
        await page.click('text=Open standard More >> button');

        let arrayOfNamesElements = await page.evaluate(() => {
            let sectionMain = document.querySelectorAll('#main p');
            return Array.from(sectionMain).reduce((acc, el) => {
                acc.push(el.textContent);
                return acc;
            }, [])
        });
            assert.deepEqual(arrayOfNamesElements, [
                "",
                "An open standard is a standard that is publicly available and has various rights to use associated with it and may also have various properties of how it was designed (e.g. open process). There is no single definition, and interpretations vary with usage.",
                "Unix (trademarked as UNIX) is a family of multitasking, multiuser computer operating systems that derive from the original AT&T Unix, development starting in the 1970s at the Bell Labs research center by Ken Thompson, Dennis Ritchie, and others.",
                "ALGOL (short for \"Algorithmic Language\") is a family of imperative computer programming languages originally developed in 1958. ALGOL heavily influenced many other languages and was the standard method for algorithm description used by the Association for Computing Machinery (ACM) in textbooks and academic sources until object-oriented languages came around, for more than thirty years.",
            ]);


        let buttons = await page.evaluate(() => {
            let sectionMain = document.querySelectorAll('#main button');
            return Array.from(sectionMain).reduce((acc, el) => {
                acc.push(el.textContent);
                return acc;
            }, [])
        });
        assert.deepEqual(buttons, [ 'More', 'Less', 'Less', 'Less' ]);
    });

    it('Should load title', async () => {
        await page.goto('http://localhost:3000/');
        let count = await page.evaluate(() => {
            let sectionMain = document.querySelector('#main');

            return sectionMain.children.length;
        });
        let arrayOfNamesElements = await page.evaluate(() => {
            let sectionMain = document.querySelectorAll('#main span');
            return Array.from(sectionMain).reduce((acc, el) => {
                acc.push(el.textContent);
                return acc;
            }, [])
        });
        expect(count).to.be.greaterThan(0);
        assert.deepEqual(arrayOfNamesElements, ["Scalable Vector Graphics", "Open standard", "Unix", "ALGOL"]);
    });
});
