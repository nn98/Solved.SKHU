// const WaitNotify = require('wait-notify');
// const waitNotify = new WaitNotify();

// (async () => {
//     setInterval(() => {
//         waitNotify.notify();
//     }, 1000);
// })();

// (async () => {
//     let count = 10;
//     while (count > 0) {
//       try {
//         await waitNotify.wait();
//       } catch (e) {
//         console.log(e);
//       }
//       count--;
//       console.log('wait notify count', count);
//     }
// })();

const WaitNotify = require('wait-notify');
const waitNotify = new WaitNotify();

// (async () => {
//     setInterval(() => {
//         waitNotify.notify();
//     }, 1000);
// })();

(async () => {
    let count = 10,sum=0;
    while (count > 0) {
      try {
        for(let i=0;i<50;sum+=++i);
        console.log(sum);
        await waitNotify.wait();
        console.log(sum);
      } catch (e) {
        console.log(e);
      }
      count--;
      console.log('wait notify count', count,'sum',sum);
    }
})().then(()=>waitNotify.notify()).then(()=>);