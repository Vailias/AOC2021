import * as day3 from "./index"

let rawInput = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
];
let input: { data: Uint16Array, width: number};
let inputFile = "./input.txt";
beforeEach(()=>{
    input = day3.parseInput(rawInput);
   // console.debug(input);
    expect(typeof input.data[0]).toBe("number");
    expect(input.data[1]).toBe(0b11110);
    
});

describe("core functionality with test data",()=>{
    test("Calculate Gamma Rate",()=>{
        expect(day3.calcGamma(input)).toBe(22);
    });

    test("Calculate Epsilon Rate",()=>{
        expect(day3.calcEpsilon(input)).toBe(9);
    });

    test("Calculate power consumption",()=>{
        expect(day3.calcPower(input)[2]).toBe(198);
    });

    test("Calculate 02 generator rating",()=>{
        expect(day3.calcOxy(input)).toBe(23);
    })
    test("Calculate CO2 Scrubbber rating",()=>{
        expect(day3.calcCO2(input)).toBe(10);

    })
    test("Calculate life support",()=>{
        expect(day3.calcLifeSupport(input)).toBe(230);
    })
});

describe("External file tests",()=>{
    let externalInput : day3.bitData;
    test("Basic loading",()=>{
        externalInput = day3.loadInput(__dirname+"/"+inputFile);
        expect(typeof externalInput.data[0]).toBe("number");
        expect(externalInput.data.length).toBe(1000);
    });
    test("Power Calculation",()=>{
        let output = day3.calcPower(externalInput);
        console.log(`Power calc is ${output}`);
        expect(output[2]).toBeGreaterThan(1);
    })
    test("Life support Calculation",()=>{
        let lifeSupportRating = day3.calcLifeSupport(externalInput);
        console.log(`Life support rating is ${lifeSupportRating}`);
        expect(lifeSupportRating).toBeGreaterThan(1);
    })
})