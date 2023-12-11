import { readFileLines } from "../utils/input.js";

const DAY = "11";

const parseInputData = () => {
  const rows = readFileLines(`input/${DAY}.txt`).map((line) => line.split(""));
  return rows;
};

const expandVertically = (rows) => {
  let expanded = [...rows];
  let added = 0;
  rows.forEach((row, i) => {
    if (!row.includes("#")) {
      expanded = expanded
        .slice(0, i + added + 1)
        .concat(expanded.slice(i + added));
      added++;
    }
  });
  return expanded;
};

const expandHorizontally = (rows) => {
  let expanded = [...rows];
  let added = 0;

  for (let i = 0; i < rows[0].length; i++) {
    let expand = true;
    for (let j = 0; j < rows.length; j++) {
      if (rows[j][i] === "#") {
        expand = false;
        break;
      }
    }
    if (expand) {
      expanded = expanded.map((row) =>
        row.slice(0, i + added + 1).concat(row.slice(i + added))
      );
      added++;
    }
  }

  return expanded;
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

const addDistances = (galaxies) => {
  let total = 0;
  let pairs = 0;
  let distances = [];

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [x1, y1] = galaxies[i];
      const [x2, y2] = galaxies[j];
      const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      total += distance;
      pairs++;
      distances.push(distance);
    }
  }
  console.log(distances);

  return total;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const rows = parseInputData();
  console.log(`Rows before expansion ${rows.length}`);
  console.log(`Cols before expansion ${rows[0].length}`);
  const expandedVert = expandVertically(rows);
  const expanded = expandHorizontally(expandedVert);
  console.log(`Rows after expansion ${expanded.length}`);
  console.log(`Cols after expansion ${expanded[0].length}`);

  const galaxies = findGalaxies(expanded);

  const totalDistance = addDistances(galaxies);

  console.log(`Total distance ${totalDistance}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
