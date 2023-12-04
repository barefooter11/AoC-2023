import { readFileLines } from "../utils/input.js";

const DAY = "4";

const parseInputData = () => {
  const cards = readFileLines(`input/${DAY}.txt`);
  return cards.map((card) => {
    let stripped = card.replace(/ +/g, " ");
    const [cardId, cardData] = stripped.split(": ");
    const [_, cardNumber] = cardId.split(" ");
    let [winningNumbers, yourNumbers] = cardData.split(" | ");
    winningNumbers = winningNumbers.split(" ");
    yourNumbers = yourNumbers.split(" ");
    const { points, matches } = countPoints(winningNumbers, yourNumbers);
    return {
      cardNumber,
      winningNumbers,
      yourNumbers,
      points,
      matches,
    };
  });
};

const countPoints = (winningNumbers, yourNumbers) => {
  return yourNumbers
    .filter((number) => winningNumbers.includes(number))
    .reduce(
      (data) => ({
        points: data.points ? data.points * 2 : 1,
        matches: data.matches + 1,
      }),
      {
        points: 0,
        matches: 0,
      }
    );
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const cards = parseInputData();

  const { totalPoints, copies } = cards.reduce(
    (data, card) => {
      const copies = { ...data.copies };
      const currentCopiesThisCard = copies[card.cardNumber] || 0;
      const copiesToMake = currentCopiesThisCard + 1;
      for (let i = 1; i <= card.matches; i++) {
        const cardNumberToCopy = Number(card.cardNumber) + i + "";
        const currentCopiesCopiedCard = copies[cardNumberToCopy] || 0;
        copies[cardNumberToCopy] = currentCopiesCopiedCard + copiesToMake;
      }
      return {
        ...data,
        totalPoints: data.totalPoints + card.points,
        copies,
      };
    },
    { totalPoints: 0, copies: {} }
  );

  console.log(`Total points are ${totalPoints}`);

  const totalCards =
    cards.length +
    Object.entries(copies).reduce((total, [_, count]) => total + count, 0);

  console.log(`Total number of cards ${totalCards}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
