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
let ID_LIST = [
    "minjeong2904", "minjune8506", "kim97", "tndusy27", "kshyun419",
    "jkkj0414", "06zzkimzz06", "rlaxogjs5656", "haeunkim0807", "hesy0147",
    "201632006", "hyk4238", "a3920679", "jinsu4755", "eunseo5355",
    "sonyejin6449", "itcantbetrueitsundifinezzzzzz", "20184120", "hs980414", "202014021",
    "kuntek1953", "lsh328328", "201634015", "leejh0702", "szljs",
    "dlaxodud1217", "abcdeun", "jiyoon", "itcantbetrueitsundifinezzzzzz", "vact19",
    "joseeun0805", "wnehdtjr5", "hackin", "jinseeun1127", "dd0910",
    "itcantbetrueitsundifinezzzzzz", "gustn8523", "gjwldud0719"
];
let distribution=2;
const puppeteer = require("puppeteer");
const WaitNotify = require('wait-notify');
const waitNotify = new WaitNotify();
const cheerio = require("cheerio");
process.setMaxListeners(50);

// 9251 , 9252 , 1260 , 132 , 10451
let pID = 1260;
let processID;
let resultS="";
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

        const html = await page.$eval("td.result", e => e.outerHTML);

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
        for(let i=0;i<results.length;i+=2){
            resultS+=(results[i]==="itcantbetrueitsundifinezzzzzz"?"미제출":results[i])
            +"\t"+(results[i+1]?1:0)+"\n";
            // console.log(results[i]+"\t"+results[i+1]);
        }
        // console.log(results);
        console.log("distribution",distribution,"pID",pID);
        console.log(resultS);
        isAssigned = true;
        process.exit(0);
    }
    else {
        console.log('-------------------------------------------------------------------------');
        run();
    }
};

run();