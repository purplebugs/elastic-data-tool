import { readFileSync } from "fs";

export default function fileReader(fileIn) {
  // Read file from disk
  const myFile = readFileSync(`./data/${fileIn}`);

  // Parse file
  return JSON.parse(myFile);
}
