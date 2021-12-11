import { fstat, readFileSync } from "fs";

export function countDeeper(arr : number[]):number{
    
return arr.map(function(val:number,i:number):number
        {
            return val>arr[i-1]||0?1:0
        })
        .reduce((prev:number,next:number)=>prev+next, 0);

}

export function sumWindow(arr: number[], width: number){
    let sumArr:number[] = [];
    for (let i = width-1, l = arr.length; i < l; i++) {
       let sum= 0;
        for(let j=0; j<width;j++){
           sum += arr[i-j];
        }
    sumArr.push(sum);
   }
   return sumArr;
}

export function loadData(): number[]{
    return readFileSync(`${__dirname}/input.txt`, { encoding: "utf-8" }).split("\n").map((val) => parseInt(val));
}

let testRange = loadData();

console.log(`Depth increase count: ${countDeeper(testRange)}`);
console.log(`Sliding depth count: ${countDeeper(sumWindow(testRange,3))}`)