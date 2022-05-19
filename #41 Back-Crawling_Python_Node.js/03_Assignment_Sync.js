const puppeteer = require("puppeteer");
process.setMaxListeners(25);
const cheerio = require("cheerio");
const WaitNotify = require('wait-notify');
const waitNotify = new WaitNotify();

let pId=1085;
let processID;
let results = [];
let urls = ['https://www.acmicpc.net/status?problem_id=', '&user_id=', '&language_id=-1&result_id=4'];
// let testUrl = 'https://www.acmicpc.net/status?problem_id=1000&user_id=q9922000&language_id=-1&result_id=4&from_problem=1';
// let ID_LIST = [
//     "수정 실패!","neck392", "kshyun419", "asas6614", "djwls0843", "kwj9294",
//     "rladnr128", "skhu1024", "haeunkim0807", "jwnamid", "hpsd417",
//     "parkjh6275", "ssb1870", "ssj2012sms", "lsy1210", "skl0519",
//     "qmffmzpdl", "idotu", "yebinac", "dlak0011"
// ];
var ID_LIST = [
    "kshyun419", "asas6614", "kwj9294", "skhu1024", "rladnr128",
    "yebinac", "idotu", "neck392", "qmffmzpdl", "skl0519"
];
let ID_LIS_REQ = [];
let mAsyncTaskExecute = false;

async function run() {
    console.log('1. run');
    processID=ID_LIST.shift();
    let url = urls[0] + pId + urls[1] + processID + urls[2];
    execute(url);
};
// merge in run
// async function next() {
//     console.log('2. next');
//     let url = urls[0] + pId + urls[1] + ID_LIST.shift() + urls[2];
//     return ID_LIST.length == 0 ? "err" : url;
// };
async function execute(url) {
    console.log("2. execute");
    puppeteer.launch({ headless: true }).then(async browser => {

        if(mAsyncTaskExecute){
          await waitNotify.wait();
        }

        console.log("now process\t",processID);
        mAsyncTaskExecute = true;
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        const html = await page.$eval("td.result", e => e.outerHTML);

        // console.log(url, '\n', url.split('&user_id=')[1].split('&language_id')[0], html, pId);
        // console.log("\n");

        results.push(processID, html.includes('맞았습니다!!'));
        console.log("\t\t",processID,"is solve");
        isFinish();
        // const data = cheerio.load(html);

    }).catch(error => {
        console.log(processID,"isn't solve");
        results.push("\t\t",processID, false);
        // results.push(url.split('&user_id=')[1].split('&language_id')[0], false);
        isFinish();
    });
}
async function isFinish() {
    console.log('3. isFinish');
    waitNotify.notify();
    mAsyncTaskExecute=false;
    if (ID_LIST.length==0) {
        console.log(results);
        process.exit(0);
    }
    console.log('-------------------------------------------------------------------------');
    run();
};

run();