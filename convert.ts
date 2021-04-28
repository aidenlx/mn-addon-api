// @ts-check

import { readFile as rf, writeFile as wf } from "fs";
import { parse as pathParse, format, join } from "path";
import readdirp from "readdirp";
import { promisify } from "util";
import { allTypes, parse } from "./parser";

const readFile = promisify(rf);
const writeFile = promisify(wf);

(async () => {
  for await (const entry of readdirp(".", { fileFilter: "*.h" })) {
    const { fullPath } = entry;
    const newFile = pathParse(fullPath);
    newFile.ext = ".d.ts";
    newFile.name = newFile.name.substring("JSB".length);
    newFile.base = newFile.name + newFile.ext;
    let raw = await readFile(fullPath, "utf-8");

    const out = [`export class ${newFile.name} {`];

    let rawLines = raw
      .replace(/^(JSExportAs.+)\n/gm, "$1")
      .replace(/\n *\w\w\w/gm, (match)=>{
        if (match.endsWith("JSE")) return match;
        else return " "
      })
      .split("\n");

    for (const line of rawLines) {
      let parseLine;
      if ((parseLine = parse(line))) {
        out.push("  " + parseLine.replace(/\n/g,"\n  "));
      }
    }
    out.push("}");

    writeFile(format(newFile), out.join("\n"));
  }
  writeFile(
    join(__dirname, "types.json"),
    JSON.stringify([...allTypes].sort(), undefined, 2)
  );
})();