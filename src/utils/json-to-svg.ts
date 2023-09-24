import { stringify } from "svgson";
import { readFileSync } from "fs";

import { Icons } from "../../out/type";

export const json2svg = (base: string, icon: Icons) => {
  const fileContent = readFileSync(`out/${base}-${icon}.json`).toString();
  console.log(stringify(JSON.parse(fileContent)));
};
