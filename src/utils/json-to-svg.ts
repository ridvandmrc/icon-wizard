import { stringify } from "svgson";

// import { Icons } from "../../out/type";

export const json2svg = async (base: string, icon: any) => {
  const fileContent = await fetch(`./${base}-${icon}.json`);
  const content = await fileContent.json();
  return stringify(content);
};
