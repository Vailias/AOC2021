// HydroThermal Vents
import {Line, Point,isPointOnLine} from "./linearGeo";

describe("testing basic Line functions",()=>{
    let testLine = new Line([0,0],[5,5]);
    it("Has a slope of 1", ()=>{
        expect(testLine.getSlope()).toBe(1);
    })
    it("Has a y intercept of 0", ()=>{
         expect(testLine.getYIntercept()).toBe(0);
    });
    it("has a y intercept of -3.5", ()=>{
        let line2 = new Line([-1,-5],[5,4]);
        expect(line2.getYIntercept()).toBeCloseTo(3.5);
    })
    it("Has a width of 5", ()=>{
        expect(testLine.getWidth()).toBe(5);
    });
    it("Has a height of 5", () => {
        expect(testLine.getHeight()).toBe(5);
    });
    it("Its length is just over 7", ()=>{
        expect(testLine.getLength()).toBeCloseTo(Math.sqrt(50),2);
        expect(testLine.getLengthSquared()).toBe(50);
    });
    it("Extends 5 units in both directions",()=>{
        expect(testLine.getDimensions().toString()).toBe("5,5");
    });
    it("Has a midpoint of [2.5,2.5]", ()=>{
        expect(testLine.lerp(0.5).toString()).toBe("2.5,2.5");
    })
});

describe("Getting points on line",()=>{
    let testLine = new Line([0, 0], [5, 5]);
    test("point [2.5,2.5] is on line",()=>{
        expect(isPointOnLine(testLine,new Point([2.5,2.5]))).toBe(true);
    });
    test("point [0,0] is on line", () => {
        expect(isPointOnLine(testLine, new Point([0,0]))).toBe(true);
    });
    test("point [4,4]] is on line", () => {
        expect(isPointOnLine(testLine, new Point([4,4]))).toBe(true);
    });
    test("point [-1,-1] is not on line", () => {
        expect(isPointOnLine(testLine, new Point([-1, -1]))).toBe(false);
    });
    test("point [6,6] is not on line", () => {
        expect(isPointOnLine(testLine, new Point([6, 6]))).toBe(false);
    });
    test("point [2,4] is not on line", () => {
        expect(isPointOnLine(testLine, new Point([2, 4]))).toBe(false);
    });
})
