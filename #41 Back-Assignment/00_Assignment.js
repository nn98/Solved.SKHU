const puppeteer = require("puppeteer");
process.setMaxListeners(25);
const cheerio = require("cheerio");
const WaitNotify = require('wait-notify');
const { url } = require("inspector");
const waitNotify = new WaitNotify();

let testUrl = 'https://www.acmicpc.net/status?problem_id=1000&user_id=q9922000&language_id=-1&result_id=4&from_problem=1';
let urls = ['https://www.acmicpc.net/status?problem_id=', '&user_id=', '&language_id=-1&result_id=4'];
let pId = 2438, uId = 'q9922000';
let count = Number(0);
let results = [];
let ID_LIST = [
    "neck392", "kshyun419", "asas6614", "djwls0843", "kwj9294",
    "rladnr128", "skhu1024", "haeunkim0807", "jwnamid", "hpsd417",
    // "parkjh6275", "ssb1870", "ssj2012sms", "lsy1210", "skl0519",
    // "qmffmzpdl", "idotu", "yebinac", "dlak0011"
];
// let ID_LIS_REQ=[];
let i = 0;
async function run() {
    console.log('run');
    for (; i < ID_LIST.length; i++) {
        next().then(rurl => {
            puppeteer.launch({ headless: true }).then(async browser => {

                const page = await browser.newPage();

                await page.goto(rurl, { waitUntil: "networkidle2" });

                const html = await page.$eval("td.result", e => e.outerHTML);

                console.log(rurl, '\n',rurl.split('&user_id=')[1].split('&language_id')[0], html, pId);
                console.log("\n");

                results.push(rurl.split('&user_id=')[1].split('&language_id')[0], html.includes('맞았습니다!!'));
                count++;
                isFinish();

                const data = cheerio.load(html);

            }).catch(error => {
                console.log('error',i);
                results.push(rurl.split('&user_id=')[1].split('&language_id')[0], false);
                count++;
                isFinish();
            });
        })

    };
};
async function isFinish() {
    console.log('isFinish');
    if (count >= ID_LIST.length) {
        console.log(results);
        process.exit(0);
    }
};
async function next() {
    console.log('next',i);
    let rurl = urls[0] + pId + urls[1] + ID_LIST[i] + urls[2];
    return rurl;
};

run();