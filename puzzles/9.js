import { readFileLines } from "../utils/input.js";

const DAY = "9";

const parseInputData = () => {
  const data = readFileLines(`input/${DAY}.txt`).map((line) => {
    return line.split(" ").map((reading) => Number(reading));
  });
  return data;
};

const predict = (readings) => {
  let diffs = [];
  let recurse = false;
  for (let i = 1; i < readings.length; i++) {
    const diff = readings[i] - readings[i - 1];
    if (diff != 0) {
      recurse = true;
    }
    diffs.push(diff);
  }

  return recurse
    ? predict(diffs) + readings[readings.length - 1]
    : readings[readings.length - 1];
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();
  const predictions = data.map((readings) => predict(readings));
  const sum = predictions.reduce((sum, prediction) => sum + prediction, 0);

  console.log(`Total is ${sum}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
