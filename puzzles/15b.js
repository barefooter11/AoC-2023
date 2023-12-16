import { readFileLines } from "../utils/input.js";

const DAY = "15";

const parseInputData = () => {
  const strings = readFileLines(`input/${DAY}.txt`)[0].split(",");
  return strings;
};

const initializeBoxes = () => {
  const boxes = [];
  for (let i = 0; i < 256; i++) {
    boxes[i] = {
      lensLabels: [],
      lensValues: {},
    };
  }
  return boxes;
};
const boxes = initializeBoxes();

const hash = (sequence) => {
  let currentValue = 0;
  for (let i = 0; i < sequence.length; i++) {
    const asciiCode = sequence.charCodeAt(i);
    currentValue += asciiCode;
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
};

const performOperation = (label, operation, lens) => {
  const box = boxes[hash(label)];
  if (operation === "-" && box.lensLabels.includes(label)) {
    box.lensLabels.splice(box.lensLabels.indexOf(label), 1);
    delete box.lensValues.label;
  } else if (operation === "=") {
    box.lensValues[label] = lens;
    if (!box.lensLabels.includes(label)) {
      box.lensLabels.push(label);
    }
  }
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const strings = parseInputData();
  strings.forEach((string) => {
    const [_, label, operation, lens] = string.match(/^(.+)([=-])(\d?)$/);
    performOperation(label, operation, lens);
  });

  const totalPower = boxes
    .flatMap((box, boxIndex) => {
      return box.lensLabels.map(
        (lens, lensIndex) =>
          (boxIndex + 1) * (lensIndex + 1) * box.lensValues[lens]
      );
    })
    .reduce((totalPower, power) => totalPower + power, 0);

  console.log(`Total power is ${totalPower}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
