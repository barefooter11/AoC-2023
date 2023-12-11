import { readFileLines } from "../utils/input.js";

const DAY = "8";

const parseInputData = () => {
  const lines = readFileLines(`input/${DAY}.txt`);
  const instructions = lines.shift().split("");
  const nodes = {};
  const startingNodes = [];
  lines.slice(1).forEach((nodeLine) => {
    const [thisNode, leftRightNodes] = nodeLine.split(" = ");
    const [left, right] = leftRightNodes.slice(1, -1).split(", ");
    nodes[thisNode] = {
      thisNode,
      left,
      right,
    };
    if (thisNode.endsWith("A")) {
      startingNodes.push(thisNode);
    }
  });
  return {
    startingNodes,
    nodes,
    instructions,
  };
};

const lcm = (a, b) => {
  return Math.abs((a * b) / gcd(a, b));
};

const gcd = (a, b) => {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const { nodes, startingNodes, instructions } = parseInputData();

  let currentNodes = startingNodes;
  let steps = 0;

  const stepsToComplete = [];

  while (
    stepsToComplete.filter((item) => item != null).length < startingNodes.length
  ) {
    steps++;
    const instruction = instructions.shift();
    instructions.push(instruction);
    const nextNodes = [];
    currentNodes.forEach((node, i) => {
      const nextNode =
        instruction === "L" ? nodes[node].left : nodes[node].right;
      if (nextNode.endsWith("Z")) {
        stepsToComplete[i] = steps;
      }
      nextNodes.push(nextNode);
    });
    currentNodes = nextNodes;
  }
  console.log(stepsToComplete);
  const result = stepsToComplete.reduce(
    (result, steps) => lcm(result, steps),
    1
  );
  console.log(`Took ${steps} steps`);
  console.log(`Result is ${result}`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
