// npm i wait-notify puppeteer cheerio
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const WaitNotify = require("wait-notify");
const waitNotify = new WaitNotify();
const waitNotify2 = new WaitNotify();
const waitNotify3 = new WaitNotify();
const waitNotify4 = new WaitNotify();
const waitNotify5 = new WaitNotify();
let AssignTaskExecute = false;

app.use(cors());

// JSON과 URL-encoded 외에도 해석할 수 있도록 해주기
app.use(bodyParser.json());

// app.get('/', (req, res) => res.send('Hello World2!'))

app.listen(port, () => {
  console.log(`express is  ${port}`);
});

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "54.180.98.222",
  user: "Project",
  password: "testing00",
  database: "SWP",
  multipleStatements: true,
});

connection.connect(() => {
  console.log("connecting");
});

const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
process.setMaxListeners(50)

solvePage("https://solved.ac/profile/asb0313/solved","asb0313");
async function solvePage(url,userid){

    puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()
      
      await page.goto(url, { waitUntil: 'networkidle2' })
      const content = await page.content();
        let solpage = 1;
        const $ = cheerio.load(content);
        const list5 = $("#__next > div > div.css-axxp2y > div > div:nth-child(4) > div.css-18lc7iz");
        const pages = $(list5).find("a").toString()
        let a = pages.split('</a>');
        let b = a[a.length-2].split('class="css-af4alp">');
        console.log(b[1])
        while(solpage<=b[1]){
          solveProblem("https://solved.ac/profile/"+userid+"/solved?page="+solpage,userid)
          solpage++;
        }
  
        AssignTaskExecute = false
        waitNotify5.notify();
  })
    
  .catch((error) => {
      console.log(error)
  })
  }
  async function solveProblem(url,userid){
    puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage()
      
      await page.goto(url, { waitUntil: 'networkidle2' })
      const content = await page.content();
        const $ = cheerio.load(content);
        const lists = $("tr");
        let c5 = []
        let d5 = []
        let name5 = []
        let resul5 = []
        lists.each((index, list) => {
            name5 = $(list).find("td").toString();
              c5 = name5;
              d5  = c5.split("</td>");
              resul5[0] = d5[0].replace(/(<([^>]+)>)|&nbsp;/ig, "")
            const sql = "insert into Solve(USER_ID, PRIBLEM_ID) values(\""+userid+"\",\""+resul5[0]+"\")"
            // console.log(sql)
            console.log(userid+" "+resul5[0])
            // connection.query(sql, async function (err, result, fields) {
            //   if (err) {
            //     console.log('err in update',err);
            //   }
            // });      
        });
        AssignTaskExecute = false
        waitNotify5.notify();
  })
    
  .catch((error) => {
      console.log(error)
  })
  }

async function hello2(url){
    puppeteer
  .launch({ headless: true })
  .then(async (browser) => {
    const page = await browser.newPage()
    
    await page.goto(url, { waitUntil: 'networkidle2' })
    const content = await page.content();
      // $에 cheerio를 로드한다.
      const $ = cheerio.load(content);
      // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
      const lists5 = $("tr");
      let d5 = []
      let name5 = []
      let resul5 = []
      let abc = []
      let ccc = []
      let ddd = []
      let result;
      lists5.each((index, list) => {
          name5 = $(list).find("td").toString().split("</td>");
            for(let e = 0;e<name5.length;e++){
                if(e!==name5.length-2){
              resul5[e] = name5[e].replace(/(<([^>]+)>)|&nbsp;/ig, "")
                }else{
                    d5[e] = name5[e].split('data-original-title="')[1].split('">')[0].replace(/(\s*)/g, "");
                    abc = d5[e].split("년");
                    ccc = abc[1].split("월")
                    ddd = ccc[1].split("일")
                }
          }
          if(ccc[0]<10){
            result = abc[0]+"-0"+ccc[0]+"-"+ddd[0]+" "+ddd[1];  
          }else{
            result = abc[0]+"-"+ccc[0]+"-"+ddd[0]+" "+ddd[1];  
          }
          if(resul5[3]==='맞았습니다!!' || resul5[3]===/[^0-9]*/+'점'){
            console.log("맞았습니다 : "+resul5[3]+" "+result)
            // const sql = "update Solve set date=\""+result+"\" where USER_ID = userid";
            // connection.query(sql, async function (err, result, fields) {
            //     if (err) {
            //       console.log('err in update',err);
            //     }
            //   });      
      }  
      });

      AssignTaskExecute = false
      waitNotify5.notify();
})
  
.catch((error) => {
    console.log(error)
})
}
hello2('https://www.acmicpc.net/status?from_mine=1&problem_id=1000&user_id=shg9411')