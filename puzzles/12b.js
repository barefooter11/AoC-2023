import { readFileLines } from "../utils/input.js";

const DAY = "12";

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
  // console.log(`Getting arrangements for ${segments} and length ${length}`);
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
      // console.log("out of segments");
      arrangements.push(prefix);
    } else {
      const suffixLength = length - prefixLength - 1;
      const suffixes = getArrangements(nextSegments, suffixLength);
      for (let suffix of suffixes) {
        let arrangement = prefix.concat(["."], suffix);
        // console.log("found arrangement " + arrangement);
        arrangements.push(arrangement);
      }
    }
  }

  return arrangements;
};

const countArrangements = (springs, segments) => {
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

    if (
      springs.slice(i, prefixLength).includes(".") ||
      (springs[prefixLength] && springs[prefixLength] === "#") ||
      (i > 0 && springs[i - 1] === "#") ||
      springs.slice(0, i).includes("#")
    ) {
      continue;
    }

    if (nextSegments.length === 0) {
      // console.log("out of segments");
      arrangements++;
    } else {
      arrangements += countArrangements(
        springs.slice(prefixLength + 1),
        nextSegments
      );
    }
  }

  return arrangements;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();
  // const entriesArrangements = data.map((entry, i) => {
  //   const possibleArrangements = getArrangements(
  //     entry.segments,
  //     entry.springs.length
  //   );
  //   console.log(`Finished getting arrangements for row ${i + 1}`);
  //   return possibleArrangements.filter((possibleArrangement) =>
  //     checkArrangement(entry.springs, possibleArrangement)
  //   );
  // });

  // const totalValidArrangements = entriesArrangements.reduce(
  //   (totalValidArrangements, entryArrangments) =>
  //     totalValidArrangements + entryArrangments.length,
  //   0
  // );

  // console.log(totalValidArrangements);

  const entriesArrangements2 = data.map((entry, i) => {
    const possibleArrangements = countArrangements(
      entry.springs,
      entry.segments
    );
    console.log(`Entry ${i + 1} has ${possibleArrangements} arrangements`);

    return possibleArrangements;
  });

  const totalValidArrangements2 = entriesArrangements2.reduce(
    (totalValidArrangements, entryArrangments) => {
      return totalValidArrangements + entryArrangments;
    },
    0
  );

  console.log(totalValidArrangements2);

  console.timeEnd(`Day ${DAY}`);
};

solve();
