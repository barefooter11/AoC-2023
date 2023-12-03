import fs from "fs";

// Creating a function which takes a file as input
export const readFileLines = (filename) =>
  fs.readFileSync(filename).toString("UTF8").split("\n");
