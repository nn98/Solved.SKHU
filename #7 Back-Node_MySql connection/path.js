let a = ["c:/temp/guide.hwp",
 "c:/pj/frontend/chap05/substring1.js",
 "homework.docx"]

let b="c:/pj/frontend/chap05/substring1.js";

for(let i=0;i<a.length;console.log('extension : '+a[i++].match(/(?=\.).+/)[0]));

for(let i=0;i<a.length;console.log('without extension : '+a[i++].match(/.+(?=\.)/)[0]));

//const reg=new RegExp('\..*');
//console.log(b.match(/(?<=\.).+/));
//push to main/master
//pull req?