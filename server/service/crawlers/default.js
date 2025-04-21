const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class DefaultCrawler {
    static async fetchPage(url, params) {
        const browser = await puppeteer.launch({ headless: true });
        try {
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });
            const content = await page.content();
            return cheerio.load(content); // $ 반환
        } finally {
            await browser.close();
        }
    }
}
module.exports = DefaultCrawler;
