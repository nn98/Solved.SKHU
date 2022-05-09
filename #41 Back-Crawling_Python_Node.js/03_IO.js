const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input=[];
let count=0;

rl.on('line', function(line) {
  const input = line.split(' ');

  const result = Number(input[0]) + Number(input[1]);
  console.log(result);

  rl.close();
}).on("close", function() {
  process.exit();
});