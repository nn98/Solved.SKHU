const puppeteer = require("puppeteer");
process.setMaxListeners(50);
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
    "parkjh6275", "ssb1870", "ssj2012sms", "lsy1210", "skl0519",
    "qmffmzpdl", "idotu", "yebinac", "dlak0011"
];

console.log(ID_LIST.length);
let i = -1;
async function run() {
    i++;
    if (i >= ID_LIST.length) {
        if(i==ID_LIST.length)console.log('run', 'Finsh at ' + i);
        return;
    }
    console.log('run in '+i);
    next().then(rurl => {
        puppeteer.launch({ headless: true }).then(async browser => {

            const page = await browser.newPage();

            await page.goto(rurl, { waitUntil: "networkidle2" });

            let solved = await page.$eval("td.result", e => e.outerHTML);

            console.log('User ID:',rurl.split('&user_id=')[1].split('&language_id')[0], '/ result:',solved);
            console.log("\n");

            results.push(rurl.split('&user_id=')[1].split('&language_id')[0], solved.includes('맞았습니다!!'));
            count++;
            isFinish();

            const data = cheerio.load(solved);

        }).then(() => run())
            .catch(error => {
                if(ID_LIST.length>i)console.error("not solve in",i);
                results.push(rurl.split('&user_id=')[1].split('&language_id')[0], false);
                count++;
                isFinish();
            }).then(()=>run());
    })


};
async function isFinish() {
    console.log(i<ID_LIST.length?'isFinish in ':'Crawling is still run in ',i);
    if (count >= ID_LIST.length) { // 이게 핵심이었다 ㄱㅇㄷ
        console.log(results);
        process.exit(0);
    }
};
async function next() {
    if (i >= ID_LIST.length) {
        if(i==ID_LIST.length)console.log('next', 'Finsh at ' + i);
        return;
    }
    console.log('next', i);
    let rurl = urls[0] + pId + urls[1] + ID_LIST[i] + urls[2];
    console.log('next url: ',rurl);
    return rurl;
};
run();