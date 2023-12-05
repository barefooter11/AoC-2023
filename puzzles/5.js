import { readFileLines } from "../utils/input.js";
import fs from "fs";

const DAY = "5";

const parseInputData = () => {
  const sections = fs
    .readFileSync(`input/${DAY}.txt`)
    .toString("UTF8")
    .split("\n\n");

  const [seedString, ...mapsRaw] = sections;
  const seeds = seedString
    .split(": ")[1]
    .split(" ")
    .map((seed) => Number(seed));

  const maps = mapsRaw.map((mapString) => {
    const [_, valuesRaw] = mapString.split(":\n");
    return valuesRaw.split("\n").map((value) => {
      const [targetRange, sourceRange, rangeLength] = value.split(" ");
      return {
        sourceRange: Number(sourceRange),
        targetRange: Number(targetRange),
        rangeLength: Number(rangeLength),
      };
    });
  });

  return {
    seeds,
    maps,
  };
};

const findMappings = (sourceValues, map) => {
  const targetValues = [];
  for (const sourceValue of sourceValues) {
    let targetValue = sourceValue;
    for (const mapping of map) {
      const { sourceRange, targetRange, rangeLength } = mapping;
      if (
        sourceValue >= sourceRange &&
        sourceValue <= sourceRange + rangeLength
      ) {
        targetValue = targetRange + (sourceValue - sourceRange);
        break;
      }
    }
    targetValues.push(targetValue);
  }
  return targetValues;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const { seeds, maps } = parseInputData();

  let values = seeds;
  maps.forEach((map) => {
    values = findMappings(values, map);
  });

  const lowestLocation = values.reduce(
    (min, value) => (value < min ? value : min),
    Infinity
  );

  console.log(`Lowest location is ${lowestLocation}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
