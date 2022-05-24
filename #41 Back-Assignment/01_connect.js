const axios = require('axios');
var request = require('request');
var cheerio = require('cheerio');

// request.get({url: 'https://solved.ac/profile/q9922000'}, function(err, response, body){
//     var $ = cheerio.load(body);

//     var arr = $('.tistory_recomm').children('.recomm_blog').children('.tit_subject');
//     for(var i=0;i<arr.prevObject.length;i++){
//     console.log(arr.prevObject[i].children[0].next.children[3].children[0].data);
//     }
//   })

let testUrl='https://www.acmicpc.net/status?problem_id=1000&user_id=q9922000&language_id=-1&result_id=4&from_problem=1';
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
async function webScraping(url, selector) {
    let res = [];
    let html = await axios.get(url);
    let $ = cheerio.load(html.data);

    for (let v of $(selector)) {
        res.push($(v).text() + '\n');
    }

    return res;
}
webScraping(testUrl, selector)
    .then(res => console.log(res))
    .catch(error=>console.error(error))