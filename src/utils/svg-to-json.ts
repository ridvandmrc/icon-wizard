import { parse } from "svgson";

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
} from "fs";

const flatFolder = (folderPath: string): string[] => {
  let icons: string[] = [];
  const folder = readdirSync(folderPath);
  folder.forEach((file) => {
    if (file.includes(".")) {
      icons.push(`${folderPath}/${file}`);
    } else {
      icons = [...icons, ...flatFolder(`${folderPath}/${file}`)];
    }
  });

  return icons;
};

export const svg2json = async (folderPath: string) => {
  const folder = flatFolder(folderPath);
  Promise.all(
    folder.map(async (filePath) => {
      const content = readFileSync(filePath).toString();
      const contentJson = await parse(content);

      writeFileSync(
        `out/${filePath.replace("/", "-").replace(".svg", ".json")}`,
        JSON.stringify(contentJson)
      );
    })
  );
  generateType(folderPath);
};

const generateType = (folderPath: string) => {
  const folder = readdirSync("out");
  const outPath = "out/type.ts";
  const fileType =
    `export type Icons = ` +
    folder
      .filter((fileName) => fileName.includes(".json"))
      .map(
        (fileName) =>
          `"${fileName
            .replace(".json", "")
            .replace(`${folderPath}-`, "")}"`
      )
      .join("\n| ") +
    ";";

  console.log("ada: ", existsSync(outPath));
  existsSync(outPath) && rmSync(outPath);
  writeFileSync("out/type.ts", fileType, { flag: "a+" });
};
