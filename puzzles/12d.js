import { readFileLines } from "../utils/input.js";

const DAY = "12";

const cache = {};

const unfold = (string, separator) => {
  const unfolded = [string].join(separator);
  return unfolded;
};

const parseInputData = () => {
  const data = readFileLines(`input/${DAY}test.txt`).map((line) => {
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

const minSegmentSpace = (segments) => {
  if (!segments.length) return 0;
  return (
    segments.reduce((total, segment) => total + segment, 0) +
    segments.length -
    1
  );
};

const countArrangements = (springs, segments) => {
  const cacheKey = springs.join("") + segments.join(",");
  console.log(`Testing ${cacheKey}`);
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const segment = segments.shift();
  let arrangements = 0;

  if (!segments.length && segment >= springs.length) {
    arrangements = springs.length === segment && !springs.includes(".") ? 1 : 0;
    cache[cacheKey] = arrangements;
    return arrangements;
  }

  const minLengthRemainingSegments = minSegmentSpace(segments);
  for (
    let i = 0;
    i <
    springs.length -
      (minLengthRemainingSegments + segment) +
      (segments.length ? 0 : 1);
    i++
  ) {
    const prefixArrangements = countArrangements(
      springs.slice(i, i + segment),
      [segment]
    );
    const suffixArrangements = segments.length
      ? countArrangements(springs.slice(i + segment + 2), segments)
      : 1;
    arrangements += prefixArrangements * suffixArrangements;
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
    console.log(`${i + 1} -> ${possibleArrangements}`);

    return possibleArrangements;
  });

  console.log(cache);

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
