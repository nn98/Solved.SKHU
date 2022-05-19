var client = require('cheerio-httpcli');
const axios = require("axios");
var cheerio = require('cheerio');
// const { async } = require('rsvp');
var async = require('async');
// let readline=require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// rl.on("line", (line) => {
//     // 한 줄씩 입력받은 후 실행할 코드
//     console.log("input: ", line);
//     // 입력된 값은 line에 저장된다.
//     rl.close(); // 필수!! close가 없으면 입력을 무한히 받는다.
// });
// rl.on('close', () => {
//     // 입력이 끝난 후 실행할 코드
//     process.exit();
// });
// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split(' ');
// let num = Number(input);
// console.log(num);
// if(line){
//     for(let i=0;i<ID_LIST.length;i++){
//         testUrl=url[0]+pId+url[1]+uId+url[2];
//         client.fetch();
//     }
// };
let testUrl = 'https://www.acmicpc.net/status?problem_id=1000&user_id=q9922000&language_id=-1&result_id=4&from_problem=1';
let selector = "td.result";
let url = ['https://www.acmicpc.net/status?problem_id=', '&user_id=', '&language_id=-1&result_id=4'];
let pId = 1000, uId = 'q9922000';
let ID_LIST = [
    "yelin", "vamos", "ujin00", "-", "didekwls0104",
    "ruddl0519", "-", "201914008", "sss4920", "tjdeoduf1228",
    "yeachan0724", "ymreueo", "ksk78030", "minjiii00", "Chelry0",
    "-", "-", "201914018", "nahyunho1030", "kll4400",
    "ekdms3868", "gjwldud0719", "pyr981125", "gpwl0773", "0928bh",
    "201914081", "wndud5750", "epselcks1", "nada2121", "bsm3737",
    "leehy321", "o0o0o557", "apple2701", "isf1999", "eunseo5355",
    "choijudy0405", "jhhgms"
];
var param = {};

client.set('headers', {           // 크롤링 방지 우회를 위한 User-Agent setting
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    'Accept-Charset': 'utf-8'
});
async function assignment() {
    let result = [];
    for (let i = 0; i < ID_LIST.length; i++) {
        testUrl = url[0] + pId + url[1] + ID_LIST[i] + url[2];
        client.fetch(testUrl, param, function (err, $, res) {
            if (err) {
                console.log(err);
                return;
            }
            $('td.result').each(function (idx) {
                let t = $(this).text();
                result.push(ID_LIST[i] + t);
                console.log(ID_LIST[i] + t);
                console.log('\n');
                // console.log(result);
                // print(ID_LIST[i]+t);
            })
            // let $ = cheerio.load(html.data);
            // for (let v of $(selector)) {
            //     res.push($(v).text() + '\n');
            // }
            // $.parseHTML('div')
            // console.log($.parseHTML('div'));
            // console.log($.html());
            // console.log(res);
        });
    };
    return result;
}
assignment()
    .then(result => console.log(result))
    .catch(error=>console.error(error))