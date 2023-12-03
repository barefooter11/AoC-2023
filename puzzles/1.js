import { readFileLines } from "../utils/input.js";

const DAY = "1";
const replacements = [
  {
    from: "twone",
    to: "21",
  },
  {
    from: "eightwo",
    to: "82",
  },
  {
    from: "eighthree",
    to: "83",
  },
  {
    from: "nineight",
    to: "98",
  },
  {
    from: "oneight",
    to: "18",
  },
  {
    from: "one",
    to: "1",
  },
  {
    from: "two",
    to: "2",
  },
  {
    from: "three",
    to: "3",
  },
  {
    from: "four",
    to: "4",
  },
  {
    from: "five",
    to: "5",
  },
  {
    from: "six",
    to: "6",
  },
  {
    from: "seven",
    to: "7",
  },
  {
    from: "eight",
    to: "8",
  },
  {
    from: "nine",
    to: "9",
  },
  {
    from: /\D/g,
    to: "",
  },
];

const parseInputData = () => {
  return readFileLines(`input/${DAY}.txt`);
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();
  const nums = data.map((entry) => {
    let numeric = entry;
    for (let replacement of replacements) {
      numeric = numeric.replaceAll(replacement.from, replacement.to);
    }
    const first = numeric.charAt(0);
    const last = numeric.charAt(numeric.length - 1);
    return Number(first + last);
  });

  const sum = nums.reduce((prev, current) => prev + current, 0);

  console.log(`Total is ${sum}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
