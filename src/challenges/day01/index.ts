import { fstat, readFileSync } from "fs";

export function countDeeper(arr : number[]):number{
    let count = 0;
   for(let i=1,l=arr.length; i<l; i++){
       
    arr[i]>arr[i-1]?count++:null;
   }
    return count;
}
export function loadData(): number[]{
    return readFileSync(`${__dirname}/input.txt`, { encoding: "utf-8" }).split("\n").map((val) => parseInt(val));
}

let testRange = loadData();

console.log(countDeeper(testRange));