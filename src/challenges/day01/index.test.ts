
import * as day1 from "./index";


test("checks for one increase", ()=>{
    let testArr = [100,99,100];
    expect(day1.countDeeper(testArr)).toBe(1);
});

test("Checks for 99 increases", ()=>{
    let testArr = Array.from(Array(100).keys());
    expect(day1.countDeeper(testArr)).toBe(99);

});

test("checks for 0 increases", () => {
    let testArr = [99, 99, 99];
    expect(day1.countDeeper(testArr)).toBe(0);
});

test("loads array correctly.", ()=>{
    let testArr = day1.loadData();
    expect(testArr.length).toBe(2000);
    expect(testArr[0]).toBe(141);
    expect(testArr[testArr.length-1]).toBe(2682);
});


