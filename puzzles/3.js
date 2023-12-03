import { readFileLines } from "../utils/input.js";

const DAY = "3";

const parseInputData = () => {
  const lines = readFileLines(`input/${DAY}.txt`);
  return lines.map((line) => line.split(""));
};

const getNumberData = (i, j, data) => {
  // find startIndex of number
  while (/\d/.test(data[i][j])) {
    j--;
  }
  const startIndex = ++j;

  // find endIndex of number, tracking digits
  const digits = [];
  while (/\d/.test(data[i][j])) {
    digits.push(data[i][j++]);
  }
  const endIndex = --j;

  return {
    number: Number(digits.join("")),
    startIndex,
    endIndex,
  };
};

const processNeighboringNums = (i, j, data) => {
  let sum = 0;
  let count = 0;
  let product = 1;
  // Search all neighboring squares for numeric digits
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (/\d/.test(data[x][y])) {
        const { number, endIndex } = getNumberData(x, y, data);
        sum += number;
        product *= number;
        count++;
        y = endIndex;
      }
    }
  }
  return {
    sum,
    count,
    product,
  };
};

const solve = () => {
  console.time(`Day ${DAY}`);
  const data = parseInputData();

  let total = 0;
  let gearTotal = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    for (let j = 0; j < data.length; j++) {
      const character = line[j];
      if (/[^.\d]/.test(character)) {
        const { sum, count, product } = processNeighboringNums(i, j, data);
        total += sum;
        if (character === "*" && count === 2) {
          gearTotal += product;
        }
      }
    }
  }

  console.log(`Sum of all part numbers: ${total}`);
  console.log(`Sum of all gear ratios: ${gearTotal}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
