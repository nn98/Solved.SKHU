const puppeteer = require("puppeteer");
process.setMaxListeners(15);
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
    "yelin", "vamos", "ujin00", "didekwls0104"
];
let i = 0;
async function run() {
    console.log('run');
    for (; i < ID_LIST.length; i++) {
        next().then(rurl => {
            puppeteer.launch({ headless: true }).then(async browser => {
                // let count = 10;
                // while (count > 0) {
                //     try {
                //         await waitNotify.wait();
                //     } catch (e) {
                //         console.log(e);
                //     }
                //     count--;
                //     console.log('wait notify count', count);
                // }
                // setInterval(() => {
                //     waitNotify.notify();
                // }, 1000);


                const page = await browser.newPage();

                await page.goto(rurl, { waitUntil: "networkidle2" });

                // YouTube 페이지의 <ytd-grid-renderer> 태그 안의 내용을 가져온다.

                const html = await page.$eval("td.result", e => e.outerHTML);

                console.log(rurl, '\n',rurl.split('&user_id=')[1].split('&language_id')[0], html, pId);
                console.log("\n");

                results.push(rurl.split('&user_id=')[1].split('&language_id')[0], html.includes('맞았습니다!!'));
                count++;
                isFinish();

                const data = cheerio.load(html);

                // data("td.result").each(function (key, val) {



                //            // substring을 사용하여 불필요한 값을 잘라낸다. 

                // 	// var videoId = data( val ).attr( "href" ).substring( 9, 20 );

                // var videoTitle = data(val).text();



                // 	console.log( "VIDEO ID = ", videoId );

                // console.log("VIDEO TITLE = ", videoTitle);

                // });

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