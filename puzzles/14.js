import { readFileLines } from "../utils/input.js";

const DAY = "14";

const parseInputData = () => {
  const grid = readFileLines(`input/${DAY}.txt`).map((line) => line.split(""));
  return grid;
};

const transpose = (array) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};

const tilt = (grid, dir) => {
  let tiltedGrid = [...grid];

  if (dir === "E" || dir === "W") {
    tiltedGrid = transpose(tiltedGrid);
  }

  if (dir === "S" || dir === "E") {
    tiltedGrid.reverse();
  }

  for (let col = 0; col < tiltedGrid.length; col++) {
    let openSlot = 0;

    for (let row = 0; row < tiltedGrid[0].length; row++) {
      const char = tiltedGrid[row][col];
      if (char === "#") {
        openSlot = row + 1;
      } else if (char === "O") {
        if (row !== openSlot) {
          tiltedGrid[openSlot][col] = "O";
          tiltedGrid[row][col] = ".";
        }
        openSlot++;
      }
    }
  }

  if (dir === "S" || dir === "E") {
    tiltedGrid.reverse();
  }

  if (dir === "E" || dir === "W") {
    tiltedGrid = transpose(tiltedGrid);
  }

  return tiltedGrid;
};

const stressTest = (grid) => {
  const reversed = [...grid].reverse();
  return reversed
    .map((row) => {
      return row.filter((char) => char === "O").join("").length;
    })
    .reduce((total, rocks, index) => {
      return total + rocks * (index + 1);
    }, 0);
};

const spinorama = (grid) => {
  let dizzyGrid = [...grid];

  let cycleDetector = {};
  let cycleDetected = false;
  let stopIteratingAt = 1000000000;

  for (let i = 0; i < 1000000000 && i < stopIteratingAt; i++) {
    if (!cycleDetected) {
      const serialized = dizzyGrid.map((row) => row.join("")).join("");
      if (cycleDetector[serialized]) {
        cycleDetected = true;
        const cycleLength = i - cycleDetector[serialized];
        let remainingIterations = 1000000000 - i;
        remainingIterations %= cycleLength;
        stopIteratingAt = i + remainingIterations;
        console.log(`Detected cycle of length: ${cycleLength} starting @ ${i}`);
        console.log(`Will spin ${remainingIterations} more times`);
      } else {
        cycleDetector[serialized] = i;
      }
    }
    ["N", "W", "S", "E"].forEach((dir) => {
      dizzyGrid = tilt(dizzyGrid, dir);
    });
  }
  return dizzyGrid;
};

const solve = () => {
  console.time(`Day ${DAY}`);
  const grid = parseInputData();

  console.time(`Day ${DAY}, Part 1`);
  const tiltedNorth = tilt(grid, "N");
  const stress = stressTest(tiltedNorth);
  console.log(`Total northern stress is ${stress}`);
  console.timeEnd(`Day ${DAY}, Part 1`);

  console.time(`Day ${DAY}, Part 2`);
  const dizzyGrid = spinorama(grid);
  const dizzyStress = stressTest(dizzyGrid);
  console.log(`Stress after spin cycles ${dizzyStress}`);
  console.timeEnd(`Day ${DAY}, Part 2`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
