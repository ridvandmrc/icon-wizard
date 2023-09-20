import { parse } from "svgson";

import { readdirSync, readFileSync, writeFileSync } from "fs";

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
        `out/${filePath.replaceAll("/", "-").replace(".svg", ".json")}`,
        JSON.stringify(contentJson)
      );

      console.log("content: ", contentJson);
    })
  );
};
