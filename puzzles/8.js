import { readFileLines } from "../utils/input.js";

const DAY = "8";

const parseInputData = () => {
  const lines = readFileLines(`input/${DAY}.txt`);
  const instructions = lines.shift().split("");
  const nodes = {};
  lines.slice(1).forEach((nodeLine) => {
    const [thisNode, leftRightNodes] = nodeLine.split(" = ");
    const [left, right] = leftRightNodes.slice(1, -1).split(", ");
    nodes[thisNode] = {
      thisNode,
      left,
      right,
    };
  });
  return {
    nodes,
    instructions,
  };
};

const solve = () => {
  console.time(`Day ${DAY}`);

  const { nodes, instructions } = parseInputData();
  let currentNode = nodes["AAA"];
  let steps = 0;
  while (currentNode.thisNode != "ZZZ") {
    steps++;
    const instruction = instructions.shift();
    instructions.push(instruction);
    const nextNode = instruction === "L" ? currentNode.left : currentNode.right;
    currentNode = nodes[nextNode];
  }

  console.log(`Took ${steps} steps`);

  console.timeEnd(`Day ${DAY}`);
};

solve();
