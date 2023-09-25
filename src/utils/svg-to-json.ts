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
  await Promise.all(
    folder.map(async (filePath) => {
      const content = readFileSync(filePath).toString();
      const contentJson = await parse(content);

      writeFileSync(
        `out/${filePath.replaceAll("/", "-").replaceAll(".svg", ".json")}`,
        JSON.stringify(contentJson)
      );
    })
  );
  createHTMLFile();
  // generateType(folderPath);
};

// TODO: use type
export const generateType = (folderPath: string) => {
  const folder = readdirSync("out");
  const outPath = "out/type.ts";
  const fileType =
    `export type Icons = ` +
    folder
      .filter((fileName) => fileName.includes(".json"))
      .map(
        (fileName) =>
          `"${fileName.replace(".json", "").replace(`${folderPath}-`, "")}"`
      )
      .join("\n| ") +
    ";";

  console.log("ada: ", existsSync(outPath));
  existsSync(outPath) && rmSync(outPath);
  writeFileSync("out/type.ts", fileType, { flag: "a+" });
};

export const createHTMLFile = () => {
  const files = readdirSync("out");
  console.log(files);
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Icon wizard</title>
      <script>
        var exports = {};
      </script>
      <script type="module" src="./main.js"></script>
      <style>
      .icon-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }
      .icon-wrapper  svg {
        width:75%;
        height:75%;
      }
      </style>
    </head>
    <body>
    <div class="icon-wrapper">
    ${files
      .filter((file) => file.includes(".json"))
      .map(
        (icon) =>
          `<icon-wizard icon=${icon.replace(".json", "").replace(`icon-`, "")}
        ></icon-wizard>`
      )
      .join("\n")}
      </div>
    </body>
  </html>
  `;
  writeFileSync("out/index.html", htmlContent);
};
