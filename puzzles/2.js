import { readFileLines } from "../utils/input.js";

const DAY = "2";

const parseInputData = () => {
  const games = readFileLines(`input/${DAY}.txt`);
  return games.map((game) => {
    const [gameNumber, grabs] = game.split(": ");
    const gameId = Number(gameNumber.split(" ")[1]);
    const maxColors = grabs.split("; ").reduce(
      (prev, grab) => {
        const revealed = grab.split(", ");
        revealed.forEach((pieceColor) => {
          const [count, color] = pieceColor.split(" ");
          const numericCount = Number(count);
          if (numericCount > prev[color]) {
            prev[color] = numericCount;
          }
        });
        return prev;
      },
      { red: 0, blue: 0, green: 0 }
    );

    return { id: gameId, maxColors };
  });
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;

  const gameData = parseInputData();
  const result = gameData.reduce(
    (prev, current) => {
      const { red, green, blue } = current.maxColors;
      if (!(red > MAX_RED || green > MAX_GREEN || blue > MAX_BLUE)) {
        prev.total += current.id;
      }
      prev.power += red * green * blue;
      return prev;
    },
    { total: 0, power: 0 }
  );

  console.log(`The total is ${result.total}`);
  console.log(`The total power is ${result.power}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
