import { readFileLines } from "../utils/input.js";

const DAY = "7";

const CARD_VALUES = {
  A: 13,
  K: 12,
  Q: 11,
  J: 0,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

const parseInputData = () => {
  const hands = readFileLines(`input/${DAY}.txt`).map((hand) => {
    const [cardsString, bid] = hand.split(" ");
    const cards = cardsString.split("");

    return {
      cards,
      rank: getRank(cards),
      bid,
    };
  });
  return hands;
};

const getRank = (cards) => {
  // Reduce cards into map of card counts, and joker count
  const { counts, jokers } = cards.reduce(
    (data, card) => {
      if (card === "J") {
        data.jokers++;
      } else {
        data.counts[card] = data.counts[card] ? data.counts[card] + 1 : 1;
      }
      return data;
    },
    {
      counts: {},
      jokers: 0,
    }
  );

  // Reduce map of counts to get the maximum number of the same card, and number of doubles
  const countValues = Object.values(counts);
  const { maxOfAKind, doubles } = countValues.reduce(
    ({ maxOfAKind, doubles }, countValue) => {
      return {
        maxOfAKind: countValue > maxOfAKind ? countValue : maxOfAKind,
        doubles: countValue === 2 ? ++doubles : doubles,
      };
    },
    {
      maxOfAKind: 1,
      doubles: 0,
    }
  );

  // Five of a kind
  if (maxOfAKind + jokers === 5 || jokers === 5) {
    return 7;
  }

  // Four of a kind
  if (maxOfAKind + jokers === 4) {
    return 6;
  }

  if (maxOfAKind + jokers === 3) {
    // Full House
    if (
      (countValues.includes(3) && countValues.includes(2)) ||
      (doubles === 2 && jokers > 0)
    ) {
      return 5;
    }

    // Three of a kind
    return 4;
  }

  // Two Pair or One Pair
  if (maxOfAKind + jokers === 2) {
    return doubles === 2 ? 3 : 2;
  }

  // High Card
  return 1;
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const hands = parseInputData();
  const sortedHands = hands.sort((a, b) => {
    // First compare rank of hand
    if (a.rank !== b.rank) {
      return a.rank > b.rank ? 1 : -1;
    }

    // Then compare high cards left to right
    for (let i = 0; i < 5; i++) {
      const valueA = CARD_VALUES[a.cards[i]];
      const valueB = CARD_VALUES[b.cards[i]];
      if (valueA != valueB) {
        return valueA > valueB ? 1 : -1;
      }
    }

    // Hands are equal
    return 0;
  });

  const total = sortedHands.reduce((sum, { bid }, i) => sum + bid * (i + 1), 0);

  console.log(`Total is ${total}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
