let arr=[],j;
for(let i=0;i++<100;j=parseInt(Math.floor(Math.random()*100+1)),j%2==0?j=0:arr.push(j));
console.log("solve 1: "+arr);

let arr1=[];
for(let i=0;i<100;i++)arr1.push(Math.floor(Math.random()*100+1));
for(let i=0;i<100;i++){
    if(arr1[i]%2==0)arr1.splice(i--,1);
}
console.log("solve 2: "+arr1);