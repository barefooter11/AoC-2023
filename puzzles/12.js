import { readFileLines } from "../utils/input.js";

const DAY = "12";

const parseInputData = () => {
  const data = readFileLines(`input/${DAY}.txt`).map((line) => {
    const [springs, segments] = line.split(" ");
    return {
      springs: springs.split(""),
      segments: segments.split(",").map((segment) => Number(segment)),
    };
  });
  return data;
};

const checkArrangement = (springs, arrangement) => {
  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    const symbol = arrangement[i] || ".";
    if (spring !== "?" && spring !== symbol) {
      return false;
    }
  }
  return true;
};

const getArrangements = (segments, length) => {
  let nextSegments = [...segments];
  const thisSegment = nextSegments.shift();

  // Min length remaining segments, including gap
  const minLengthRemaining = nextSegments.length
    ? nextSegments.reduce(
        (segmentsTotal, segment) => segmentsTotal + segment,
        0
      ) + nextSegments.length
    : 0;

  const arrangements = [];
  const placements = length - minLengthRemaining - thisSegment + 1;
  for (let i = 0; i < placements; i++) {
    const prefixLength = thisSegment + i;
    let prefix = Array(prefixLength)
      .fill(".")
      .fill("#", i, i + thisSegment);

    if (nextSegments.length === 0) {
      arrangements.push(prefix);
    } else {
      const suffixLength = length - prefixLength - 1;
      const suffixes = getArrangements(nextSegments, suffixLength);
      for (let suffix of suffixes) {
        let arrangement = prefix.concat(["."], suffix);
        arrangements.push(arrangement);
      }
    }
  }

  return arrangements;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();
  const entriesArrangements = data.map((entry, i) => {
    const possibleArrangements = getArrangements(
      entry.segments,
      entry.springs.length
    );

    const validArrangements = possibleArrangements.filter(
      (possibleArrangement) =>
        checkArrangement(entry.springs, possibleArrangement)
    );

    console.log(`${i + 1} -> ${validArrangements.length}`);

    return validArrangements;
  });

  const totalValidArrangements = entriesArrangements.reduce(
    (totalValidArrangements, entryArrangments) =>
      totalValidArrangements + entryArrangments.length,
    0
  );

  console.log(totalValidArrangements);

  console.timeEnd(`Day ${DAY}`);
};

solve();
