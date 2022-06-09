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
    "eoehd1ek", "skhukdh", "sub10", "cion6339", "sinaskim",
    "samidg108", "skyjm1023", "kjh980214", "junilg", "rispend",
    "ckswlszla123", "asdz9908", "msy7378", "phs5145", "vamos",
    "itcantbetrueitsundifinezzzzzz", "qkrtnqja", "cindy1078", "smjsih", "heejeong3394",
    "anysong1", "songjuhwan33", "a26214165", "itcantbetrueitsundifinezzzzzz", "impjs17",
    "iyuna6577", "dlwldbs8015@gmail.com", "yjy5923", "itcantbetrueitsundifinezzzzzz", "qwe916",
    "reperfection", "koreanwi", "itcantbetrueitsundifinezzzzzz", "zoeyourlife", "hahnsh64",
    "3021062", "hun5078"
];
let distribution=1;
const puppeteer = require("puppeteer");
const WaitNotify = require('wait-notify');
const waitNotify = new WaitNotify();
const cheerio = require("cheerio");
process.setMaxListeners(50);

// 9251 , 9252 , 1260 , 14217
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