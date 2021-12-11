
function createGrid(size:number):number[][]
{
    let grid = [];
    for(let i in Array(size).keys()){
        let row = new Array<number>(size);
        row.fill(0);
        grid.push(row.slice(0)); //quick shallow copy
    }
    return grid;
}