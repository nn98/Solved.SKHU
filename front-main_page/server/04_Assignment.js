module.exports = {
    Assign: async function (LIST) {
        console.log('0. Assign', LIST);
        ID_LIST = LIST;
        run();
    },
    getResult: async function () {
        return results.toString;
    },
};

const puppeteer = require("puppeteer");
const WaitNotify = require('wait-notify');
const waitNotify = new WaitNotify();
const cheerio = require("cheerio");
process.setMaxListeners(50);

let pID = 1085;
let distribution;
let processID;
let results = [];
let isAssigned = false;
let mAsyncTaskExecute = false;
let urls = ['https://www.acmicpc.net/status?problem_id=', '&user_id=', '&language_id=-1&result_id=4'];

/* input line*/
// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');

// let count = input[0];
// let numbers = [];

// for (let i = 1; i < input.length; i++) {
//   if (input[i] !== '') {
//     numbers.push(input[i].split(' '));
//   }
// }

// for (let i = 0; i < numbers.length; i++){
//   let num1 = Number(numbers[i][0]);
//   let num2 = Number(numbers[i][1]);

//   console.log(num1 + num2);
// }
/**/

/* Test Data => replace by Req */
let ID_LIST = [
    "kshyun419"
    // , "asas6614", "kwj9294", "skhu1024", "rladnr128",
    // "yebinac", "idotu", "neck392", "qmffmzpdl", "skl0519"
];
/* */

async function run() {
    console.log('1. run');
    console.log('ID_LIST', ID_LIST);
    console.log('pID', pID);
    processID = ID_LIST.shift();
    let url = urls[0] + pID + urls[1] + processID + urls[2];
    execute(url);
};

async function execute(url) {
    console.log("2. execute");
    puppeteer.launch({ headless: true }).then(async browser => {

        if (mAsyncTaskExecute) {
            await waitNotify.wait();
        }

        console.log("now process\t", processID);
        mAsyncTaskExecute = true;
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        console.log(page);
        console.log(page.$eval("td",e=>e.outerHTML).getResult);

        const html = await page.$eval("td.result", e => e.outerHTML);
        // const html0 = await page.$eval("#solution-13513003 > td:nth-child(1)", e => e.outerHTML);
        // const html1 = await page.$eval("tr", e => e.outerHTML);
        // const html2 = await page.$eval("#solution-13513003", e => e.outerHTML);
        // console.log(html0);
        // console.log(html1);

        results.push(processID, html.includes('맞았습니다!!'));
        console.log("\t\t", processID, "is solve");
        isFinish();

    }).catch(error => {
        console.log("\t\t", processID, "isn't solve");
        results.push(processID, false);
        isFinish();
    });
}

async function isFinish() {
    console.log('3. isFinish');
    waitNotify.notify();
    mAsyncTaskExecute = false;
    if (ID_LIST.length == 0) {
        console.log(results);
        isAssigned = true;
        // process.exit(0);
    }
    else {
        console.log('-------------------------------------------------------------------------');
        run();
    }
};

// run();