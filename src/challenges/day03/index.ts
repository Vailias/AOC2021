import { readFileSync } from "fs"

function hammingWeight(n: number) {
    let count = 0;
    while (n) {
        n = n & (n - 1);
        count++;
    }
    return count;
}
export interface bitData { data: Uint16Array, width: number };

export function loadInput(filePath: string): bitData {
    //js handles this conversion
    //@ts-ignore
    return parseInput(readFileSync(filePath, { encoding: "utf-8" }).split("\n"));

}

export function parseInput(arr: string[]): bitData {

    return { data: Uint16Array.of(...arr.map((val) => { return parseInt(val, 2) })), width: arr[0].length };
}

export function calcGamma(input: bitData): number {
    let entryCount = input.data.length;
    let placeArray = new Array(16).fill(0);
    let placeMask = Uint16Array.of(1);

    for (let i = 0; i < entryCount; i++) {
        placeMask[0] = 1; //reset bitmask to 1
        let j = 0; //reset inner count to 0
        while (placeMask[0] != 0) {
            //if the bitmask returns a 1 increment the place counter
            input.data[i] & placeMask[0] ? placeArray[j]++ : null;
            j++;
            placeMask[0] <<= 1;
        }
    }


    return placeArray.map((value: number, i: number): number => {
        return Math.round(value / entryCount) * (1 << i)
    })
        .reduce((prev: number, current: number) => {
            return prev + current
        });
}

export function calcEpsilon(input: bitData): number {
    return Uint16Array.of(~calcGamma(input) & ((1 << input.width) - 1))[0];
}

export function calcPower(input: bitData): number[] {
    let gamma = calcGamma(input);
    let epsilon = Uint16Array.of(~gamma & ((1 << input.width) - 1))[0];
    let power = gamma * epsilon;
    return [gamma, epsilon, power];
    //this is inefficient, condense into single function returning an interface of {number, number, number}
}

export function calcLifeSupport(input: bitData): number {
    return calcOxy(input) * calcCO2(input);
}

export function calcOxy(input: bitData): number {
    return bitMatchArray(input, true);
}

function bitMatchArray(input: bitData, oxy: boolean) {
    let filterArray = Uint16Array.from(input.data);
    let mask = 1 << (input.width - 1);
    let maskTemplate = 0;
    while (filterArray.length != 1) {
        let arrayData = { data: filterArray, width: input.width };
        if (oxy) {
            maskTemplate = calcGamma(arrayData);
        }
        else {
            maskTemplate = calcEpsilon(arrayData);
        }
        filterArray = filterArray.filter((value) => {
            if (mask & maskTemplate) {
                return value & mask;
            } else {
                return ~value & mask;
            }
        });

        mask >>= 1;
    }
    return filterArray[0];
}

export function calcCO2(input: bitData): number {
    return bitMatchArray(input,false);
}