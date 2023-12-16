import { readFileLines } from "../utils/input.js";

const DAY = "15";

const parseInputData = () => {
  const strings = readFileLines(`input/${DAY}.txt`)[0].split(",");
  return strings;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const strings = parseInputData();
  const values = strings.map((other) => {
    let currentValue = 0;
    for (let i = 0; i < other.length; i++) {
      const asciiCode = other.charCodeAt(i);
      console.log(other[i]);
      console.log(asciiCode);
      // console.log(currentValue);
      currentValue += asciiCode;
      currentValue *= 17;
      currentValue %= 256;
    }
    return currentValue;
  });
  console.log(values);
  const total = values.reduce((sum, value) => sum + value, 0);
  console.log(`Total is ${total}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
