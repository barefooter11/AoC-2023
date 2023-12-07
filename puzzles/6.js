const solveRace = ({ time, distance }) => {
  let victories = 0;
  for (let i = 1; i < time; i++) {
    const speed = i;
    const actualDistance = speed * (time - i);
    if (actualDistance > distance) victories++;
  }
  return victories;
};

const solveRaceFaster = ({ time, distance }) => {
  const squareroot = Math.sqrt(Math.pow(time, 2) - 4 * distance);
  const root1 = (time - squareroot) / 2;
  const root2 = (time + squareroot) / 2;

  return Math.ceil(root2) - Math.floor(root1) - 1;
};

const solve = () => {
  const races = [
    {
      time: 44899691,
      distance: 277113618901768,
    },
  ];

  console.time("Day 6 - Bruteforce");

  const victories = races.map((race) => solveRace(race));

  const product = victories.reduce(
    (product, victories) => product * victories,
    1
  );
  console.log(product);

  console.timeEnd("Day 6 - Bruteforce");

  console.time("Day 6 - Quadratic");

  const victories2 = races.map((race) => solveRaceFaster(race));

  const product2 = victories2.reduce(
    (product, victories) => product * victories,
    1
  );
  console.log(product2);

  console.timeEnd("Day 6 - Quadratic");
};

solve();
