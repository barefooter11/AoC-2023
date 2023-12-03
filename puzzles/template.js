import { readFileLines } from "../utils/input.js";

const DAY = "x";

const parseInputData = () => {
  const lines = readFileLines(`input/${DAY}.txt`);
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();

  console.timeEnd(`Day ${DAY}`);
};

solve();
