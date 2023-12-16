import { readFileChunks } from "../utils/input.js";

const DAY = "13";

const parseInputData = () => {
  const patterns = readFileChunks(`input/${DAY}.txt`).map((pattern) => {
    return pattern.split("\n").map((line) => line.split(""));
  });
  return patterns;
};

const transpose = (pattern) => {
  return Object.keys(pattern[0]).map((column) => {
    return pattern.map((row) => row[column]);
  });
};

const lineDiff = (line1, line2) => {
  let diff = 0;
  for (let i = 0; i < line1.length; i++) {
    if (line1[i] !== line2[i]) {
      diff++;
    }
    if (diff > 1) {
      return diff;
    }
  }

  return diff;
};

const getReflectionIndexWithSmudges = (pattern) => {
  let equalityMatrix = [];

  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (!equalityMatrix[i + j]) {
        equalityMatrix[i + j] = [];
      }
      equalityMatrix[i + j][i] =
        i === j ? -1 : lineDiff(pattern[i], pattern[j]);
    }
  }
  equalityMatrix.forEach((entry) => console.log(`${entry}`));
  for (let i = 0; i < equalityMatrix.length; i++) {
    const comparisons = equalityMatrix[i].filter(
      (comparison) => comparison != null
    );
    if (
      comparisons.length > 1 &&
      comparisons.every((comparison) => comparison === 1 || comparison === 0) &&
      comparisons.filter((comparison) => comparison === 1).length === 2
    ) {
      const emptyItems = equalityMatrix[i].length - comparisons.length;
      return i - emptyItems + 1 - comparisons.length / 2;
    }
  }

  return -1;
};

const getReflectionIndex = (pattern) => {
  const lines = pattern.map((line) => line.join(""));
  let fromLeft = [];
  let fromRight = [];
  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && fromLeft[fromLeft.length - 1] === lines[i]) {
      fromLeft.pop();
    } else {
      fromLeft.push(lines[i]);
    }

    if (
      i > 0 &&
      fromRight[fromRight.length - 1] === lines[lines.length - (i + 1)]
    ) {
      fromRight.pop();
    } else {
      fromRight.push(lines[lines.length - (i + 1)]);
    }

    if (!fromLeft.length) {
      return (i + 1) / 2;
    }

    if (!fromRight.length) {
      return lines.length - (i + 1) / 2;
    }
  }

  return -1;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const patterns = parseInputData();
  const reflectionIndices = patterns.map((pattern) => {
    const reflectionIndex = getReflectionIndex(pattern);
    return reflectionIndex === -1
      ? getReflectionIndex(transpose(pattern))
      : 100 * reflectionIndex;
  });

  const sum = reflectionIndices.reduce((sum, index) => sum + index, 0);

  console.log(`Total is ${sum}`);

  const reflectionIndices2 = patterns.map((pattern) => {
    const reflectionIndex = getReflectionIndexWithSmudges(pattern);
    return reflectionIndex === -1
      ? getReflectionIndexWithSmudges(transpose(pattern))
      : 100 * reflectionIndex;
  });

  const sum2 = reflectionIndices2.reduce((sum, index) => sum + index, 0);

  console.log(`Total is ${sum2}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
