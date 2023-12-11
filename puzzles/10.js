import { readFileLines } from "../utils/input.js";

const DAY = "10";

const DIRECTION_LOOKUP = {
  UP: {
    "|": "UP",
    7: "LEFT",
    F: "RIGHT",
  },
  DOWN: {
    "|": "DOWN",
    J: "LEFT",
    L: "RIGHT",
  },
  LEFT: {
    "-": "LEFT",
    L: "UP",
    F: "DOWN",
  },
  RIGHT: {
    "-": "RIGHT",
    J: "UP",
    7: "DOWN",
  },
};

const parseInputData = () => {
  let startNode = [];
  const map = readFileLines(`input/${DAY}.txt`).map((line, i) => {
    const nodes = line.split("");
    if (nodes.includes("S")) {
      startNode.push(i, nodes.indexOf("S"));
    }
    return nodes;
  });
  return { map, startNode };
};

const findStartDirection = (map, startNode) => {
  const [x, y] = startNode;
  if (["-", "J", "7"].includes(map[x][y + 1])) {
    return "RIGHT";
  } else if (["-", "F", "L"].includes(map[x][y - 1])) {
    return "LEFT";
  }
  return "DOWN";
};

const findLoop = (map, startNode) => {
  let [x, y] = startNode;
  let points = [];
  let path = [];
  let symbol = "";
  let direction = findStartDirection(map, startNode);
  while (symbol !== "S") {
    // Update map indices
    if (direction === "UP") x--;
    else if (direction === "RIGHT") y++;
    else if (direction === "LEFT") y--;
    else x++;

    // Save new point/symbol
    symbol = map[x][y];
    if (!points[x]) {
      points[x] = [];
    }
    points[x][y] = symbol;
    path.push(symbol);

    // Get next direction to travel
    direction = DIRECTION_LOOKUP[direction][symbol];
  }
  return { points, path };
};

const getArea = (points) => {
  let inLoop = false;
  let onLoop = false;
  let onDirection = "";
  let area = 0;
  points.forEach((row) => {
    for (let symbol of row) {
      if (!symbol && inLoop) {
        area++;
      } else if (symbol === "F") {
        onLoop = true;
        onDirection = "DOWN";
      } else if (symbol === "L") {
        onLoop = true;
        onDirection = "UP";
      } else if (symbol === "J") {
        onLoop = false;
        inLoop = onDirection === "DOWN" ? !inLoop : inLoop;
      } else if (symbol === "7") {
        onLoop = false;
        inLoop = onDirection === "UP" ? !inLoop : inLoop;
      } else if (symbol === "|") {
        inLoop = !inLoop;
      }
    }
  });

  return area;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const { map, startNode } = parseInputData();
  const { points, path } = findLoop(map, startNode);
  const area = getArea(points);

  console.log(`Distance to furthest point is ${path.length / 2}`);
  console.log(`Total area is ${area}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
