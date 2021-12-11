
export class Point {
    public x: number;
    public y: number;

    constructor(point: [number, number] = [0, 0]) {
        this.x = point[0] ?? 0;
        this.y = point[1] ?? 0;
    }

    public toString() {
        return `${this.x},${this.y}`
        //Todo: consider brackets?
    }

}

export class Line {
    public start: Point;
    public end: Point;

    constructor(start: Point | [number, number], end: Point | [number, number]) {
        if (start instanceof Point && end instanceof Point) {
            this.start = Object.assign(start);
            this.end = Object.assign(end);
        } else {
            this.start = new Point(start as [number, number]);
            this.end = new Point(end as [number, number]);
        }
    }

    public getHeight() {
        return this.end.y - this.start.y;
    }

    public getWidth() {
        return this.end.x - this.start.x;
    }

    public getYIntercept() {
        return -1 * this.start.y + (this.start.x * this.getSlope());
    }

    public getDimensions() {
        return [this.getWidth(), this.getHeight()];
    }
    public getLengthSquared() {
        let w = this.getWidth();
        let h = this.getHeight();
        return w * w + h * h;
    }
    public getLength() {
        return Math.sqrt(this.getLengthSquared());
    }
    public getManhattanLength() {
        return this.getHeight() + this.getWidth();
    }
    public getSlope() {
        return this.getHeight() / this.getWidth();
    }
    public lerp(alpha: number): [number, number] {
        if (alpha > 1 || alpha < 0) {
            throw new Error("input out of range");
        }
        return [this.getWidth() * alpha + this.start.x, this.getHeight() * alpha + this.start.y]
    }

    public static distanceSq(p1: Point, p2: Point): number {
        let w = p2.x - p1.x;
        let h = p2.y - p1.y;
        return (w * w) + (h * h);
    }
    public static distance(p1: Point, p2: Point): number {
        return Math.sqrt(this.distanceSq(p1, p2));
    }
    public static manhattanDistance(p1: Point, p2: Point): number {
        let w = p2.x - p1.x;
        let h = p2.y - p1.y;
        return w + h;
    }
}

export function isPointOnLine(line: Line, point: Point): boolean {
    let l1 = new Line(point, line.start);
    let l2 = new Line(point, line.end);

    if (l1.getLength() + l2.getLength() == line.getLength()) {
        return true;
    } else {
        return false;
    }
}
