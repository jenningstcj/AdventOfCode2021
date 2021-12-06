/*
PART ONE

--- Day 5: Hydrothermal Venture ---
You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....
In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?
*/

import { input } from "./input";
import {filter} from "../../helpers/hashMap"

type Coordinate = { x: number; y: number };

type Segment = {
  coordinate1: Coordinate;
  coordinate2: Coordinate;
  spaces: Coordinate[];
};

const isHorizontal = (segment: Segment): Boolean =>
  segment.coordinate1.x == segment.coordinate2.x;

const isVertical = (segment: Segment): Boolean =>
  segment.coordinate1.y == segment.coordinate2.y;

const getSpacesPopulatedBySegment = (segment: Segment): Coordinate[] => {
  let x = segment.coordinate1.x,
    y = segment.coordinate1.y;
  const spots = [];
  spots.push(segment.coordinate1);
  while (x != segment.coordinate2.x || y != segment.coordinate2.y) {
    if (x < segment.coordinate2.x) {
      x++;
    } else if (x > segment.coordinate2.x) {
      x--;
    }
    if (y < segment.coordinate2.y) {
      y++;
    } else if (y > segment.coordinate2.y) {
      y--;
    }
    spots.push(<Coordinate>{ x, y });
  }
  return spots;
};

const dataMap = input
  .split(/\r?\n/)
  .map(
    (line) =>
      ({
        coordinate1: {
          x: parseInt(line.split(" -> ")[0].split(",")[0], 10),
          y: parseInt(line.split(" -> ")[0].split(",")[1], 10),
        },
        coordinate2: {
          x: parseInt(line.split(" -> ")[1].split(",")[0], 10),
          y: parseInt(line.split(" -> ")[1].split(",")[1], 10),
        },
        spaces: [],
      } as Segment)
  )
  .filter((segment) => isHorizontal(segment) || isVertical(segment))
  .map((segment) => getSpacesPopulatedBySegment(segment))
  .reduce((acc, val) => acc.concat(...val), [])
  .reduce((acc, val, index, original) => {
    const key = `${val.x.toString().trim()}-${val.y.toString().trim()}`;
    const instance:number = acc.get(key) ?? 1
    return acc.set(key, instance + 1)
  }, new Map());
  

//@ts-ignore
console.log('[part 1 answer]', new Map([...dataMap].filter(([key,value]) => value > 2)).size);
//6225

/*
PART TWO

--- Part Two ---
Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....
You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.

Consider all of the lines. At how many points do at least two lines overlap?
*/

const formatedInput2 = input
  .split(/\r?\n/)
  .map(
    (line) =>
      ({
        coordinate1: {
          x: parseInt(line.split(" -> ")[0].split(",")[0], 10),
          y: parseInt(line.split(" -> ")[0].split(",")[1], 10),
        },
        coordinate2: {
          x: parseInt(line.split(" -> ")[1].split(",")[0], 10),
          y: parseInt(line.split(" -> ")[1].split(",")[1], 10),
        },
        spaces: [],
      } as Segment)
  )
  .map((segment) => getSpacesPopulatedBySegment(segment))
  .reduce((acc, val) => acc.concat(...val), [])
  .reduce((acc, val, index, original) => {
    const key = `${val.x.toString().trim()}-${val.y.toString().trim()}`;
    const instance:number = acc.get(key) ?? 1
    return acc.set(key, instance + 1)
  }, new Map());



//@ts-ignore
console.log('[part 2 answer]', filter<string, number>(formatedInput2, <string, number>([key,value]) => value > 2).size);

//run with:  npx ts-node ./Days/05/05.ts
