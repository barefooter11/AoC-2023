const DAY = "x";

const parseInputData = () => {
  const lines = fs.readFileSync(`${DAY}.txt`).toString("UTF8").split("\n");
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const data = parseInputData();

  console.timeEnd(`Day ${DAY}`);
};

solve();
