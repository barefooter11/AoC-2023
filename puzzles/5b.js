import fs from "fs";

const DAY = "5";

const parseInputData = () => {
  const sections = fs
    .readFileSync(`input/${DAY}.txt`)
    .toString("UTF8")
    .split("\n\n");

  const [seedString, ...mapsRaw] = sections;
  let seedRanges = [];
  const seedRangesRaw = seedString
    .split(": ")[1]
    .split(" ")
    .map((seed) => Number(seed));
  for (let i = 0; i < seedRangesRaw.length - 1; i += 2) {
    const seedRangeStart = seedRangesRaw[i];
    const seedRangeLength = seedRangesRaw[i + 1];
    const seedRangeEnd = seedRangeStart + (seedRangeLength - 1);
    seedRanges.push([seedRangeStart, seedRangeEnd]);
  }

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
    seedRanges,
    maps,
  };
};

const findMappings = (inputRanges, map) => {
  const matches = [];
  const recurseMatches = [];
  for (const inputRange of inputRanges) {
    for (const mapping of map) {
      const { sourceRange, targetRange, rangeLength } = mapping;
      const [rangeStart, rangeEnd] = inputRange;
      const mapSourceStart = sourceRange;
      const mapSourceEnd = mapSourceStart + (rangeLength - 1);
      const mapTargetStart = targetRange;
      const mapTargetEnd = mapTargetStart + (rangeLength - 1);

      if (
        (rangeStart >= mapSourceStart && rangeStart <= mapSourceEnd) ||
        (rangeEnd >= mapSourceStart && rangeEnd <= mapSourceEnd)
      ) {
        const matchStart =
          rangeStart < mapSourceStart
            ? mapTargetStart
            : mapTargetStart + (rangeStart - mapSourceStart);
        const matchEnd =
          rangeEnd > mapSourceEnd
            ? mapTargetEnd
            : mapTargetStart + (rangeEnd - mapSourceStart);
        matches.push([matchStart, matchEnd]);
      }
    }
    if (!matches.length) {
      matches.push(inputRange);
    }
  }

  return matches;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const { seedRanges, maps } = parseInputData();

  let ranges = seedRanges;
  maps.forEach((map) => {
    ranges = findMappings(ranges, map);
  });

  const lowest = ranges
    .map((locationRange) => locationRange[0])
    .reduce((min, num) => (num < min ? num : min), Infinity);

  console.log(`Lowest location is ${lowest}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
