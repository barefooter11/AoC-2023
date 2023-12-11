import { readFileLines } from "../utils/input.js";

const DAY = "11";

const parseInputData = () => {
  const rows = readFileLines(`input/${DAY}.txt`).map((line) => line.split(""));
  return rows;
};

const expandVertically = (rows) => {
  let expansions = [];
  rows.forEach((row, i) => {
    if (!row.includes("#")) {
      expansions.push(i);
    }
  });
  return expansions;
};

const expandHorizontally = (rows) => {
  let expansions = [];

  for (let i = 0; i < rows[0].length; i++) {
    let expand = true;
    for (let j = 0; j < rows.length; j++) {
      if (rows[j][i] === "#") {
        expand = false;
        break;
      }
    }
    if (expand) {
      expansions.push(i);
    }
  }

  return expansions;
};

const findGalaxies = (universe) => {
  const galaxies = [];
  universe.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === "#") {
        galaxies.push([i, j]);
      }
    });
  });
  return galaxies;
};

const getDistance = (
  point1,
  point2,
  verticalExpansions,
  horizontalExpansions
) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  const xStart = x1 > x2 ? x2 : x1;
  const yStart = y1 > y2 ? y2 : y1;
  const xEnd = x1 > x2 ? x1 : x2;
  const yEnd = y1 > y2 ? y1 : y2;

  let distance = 0;
  for (let x = xStart; x < xEnd; x++) {
    distance += verticalExpansions.includes(x) ? 1000000 : 1;
  }
  for (let y = yStart; y < yEnd; y++) {
    distance += horizontalExpansions.includes(y) ? 1000000 : 1;
  }
  return distance;
};

const addDistances = (galaxies, verticalExpansions, horizontalExpansions) => {
  let total = 0;
  let pairs = 0;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      total += getDistance(
        galaxies[i],
        galaxies[j],
        verticalExpansions,
        horizontalExpansions
      );
      pairs++;
    }
  }

  return total;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const rows = parseInputData();
  const verticalExpansions = expandVertically(rows);
  const horizontalExpansions = expandHorizontally(rows);
  const galaxies = findGalaxies(rows);

  const totalDistance = addDistances(
    galaxies,
    verticalExpansions,
    horizontalExpansions
  );

  console.log(`Total distance ${totalDistance}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
