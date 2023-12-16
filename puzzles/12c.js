import { readFileLines } from "../utils/input.js";

const DAY = "12";

const cache = {};

const unfold = (string, separator) => {
  const unfolded = [string, string, string, string, string].join(separator);
  return unfolded;
};

const parseInputData = () => {
  const data = readFileLines(`input/${DAY}.txt`).map((line) => {
    const [springs, segments] = line.split(" ");
    return {
      springs: unfold(springs, "?").split(""),
      segments: unfold(segments, ",")
        .split(",")
        .map((segment) => Number(segment)),
    };
  });
  return data;
};

const countArrangements = (springs, segments) => {
  const cacheKey = springs.join("") + segments.join(",");
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let nextSegments = [...segments];
  const thisSegment = nextSegments.shift();

  // Min length remaining segments, including gap
  const minLengthRemaining = nextSegments.length
    ? nextSegments.reduce(
        (segmentsTotal, segment) => segmentsTotal + segment,
        0
      ) + nextSegments.length
    : 0;

  let arrangements = 0;
  const possiblePlacements =
    springs.length - minLengthRemaining - thisSegment + 1;
  for (let i = 0; i < possiblePlacements; i++) {
    const prefixLength = thisSegment + i;
    const suffixStart = prefixLength + 1;

    if (
      // '#' directly after placement
      (springs[prefixLength] && springs[prefixLength] === "#") ||
      // Spring blocked from placement
      springs.slice(i, prefixLength).includes(".") ||
      // not needed?
      // (i > 0 && springs[i - 1] === "#") ||
      //
      // springs.slice(0, i).includes("#") ||
      (!nextSegments.length && springs.slice(suffixStart).includes("#"))
    ) {
      continue;
    }

    if (springs.slice(0, i).includes("#")) {
      break;
    }

    if (nextSegments.length === 0) {
      arrangements++;
    } else {
      arrangements += countArrangements(
        springs.slice(suffixStart),
        nextSegments
      );
    }
  }

  cache[cacheKey] = arrangements;

  return arrangements;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();

  const entriesArrangements = data.map((entry, i) => {
    const possibleArrangements = countArrangements(
      entry.springs,
      entry.segments
    );
    // console.log(`${i + 1} -> ${possibleArrangements}`);

    return possibleArrangements;
  });

  // console.log(cache);

  const totalValidArrangements = entriesArrangements.reduce(
    (totalValidArrangements, entryArrangments) => {
      return totalValidArrangements + entryArrangments;
    },
    0
  );

  console.log(totalValidArrangements);

  console.timeEnd(`Day ${DAY}`);
};

solve();
