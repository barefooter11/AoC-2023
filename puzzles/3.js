import { readFileLines } from "../utils/input.js";

const parseInputData = () => {
  const lines = readFileLines("input/3.txt");
  return lines.map((line) => line.split(""));
};

const getNumberData = (i, j, data) => {
  while (/\d/.test(data[i][j])) {
    j--;
  }
  const startIndex = ++j;
  const digits = [];
  while (/\d/.test(data[i][j])) {
    digits.push(data[i][j++]);
  }
  const endIndex = --j;
  const numberData = {
    number: Number(digits.join("")),
    startIndex,
    endIndex,
  };
  console.log(numberData);
  return numberData;
};

const sumNeighboringNums = (i, j, data) => {
  let sum = 0;
  let count = 0;
  let product = 1;
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (/\d/.test(data[x][y])) {
        console.log(`Found digit ${data[x][y]} at ${x},${y}`);
        const numberInfo = getNumberData(x, y, data);
        sum += numberInfo.number;
        product *= numberInfo.number;
        count++;
        y = numberInfo.endIndex;
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
  const data = parseInputData();

  let total = 0;
  let gearTotal = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    for (let j = 0; j < data.length; j++) {
      const character = line[j];
      if (/[^.\d]/.test(character)) {
        console.log(`Found symbol at ${i},${j}`);
        const { sum, count, product } = sumNeighboringNums(i, j, data);
        console.log(`Sum of neighboring numbers is ${sum}`);
        total += sum;

        if (character === "*" && count === 2) {
          gearTotal += product;
        }
      }
    }
  }

  console.log(total);
  console.log(gearTotal);
};

solve();
