import { mapType as mapTypeCore } from "./typeMap";
import assertNever from "assert-never";

function Capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type HintBasic = {
  type: "prop"|"arg"|"ret";
  hint: string;
}

interface ReturnHint extends HintBasic{
  type: "ret";
}

interface ArgHint extends HintBasic{
  name: string;
  type: "arg";
}

interface PropHint extends HintBasic{
  type: "prop";
}

type Hint = ReturnHint | ArgHint | PropHint;

export function parse(line: string) {
  
  let comment = line.match(/\/\/.+/)?.[0];
  if (comment) {
    line = line.slice(0, -comment.length);
  }
  if (line.startsWith("@property")) {
    // line = bracketTrim(line,1);
    line = parseProp(line);
  } else if (line.startsWith("JSExportAs(")) {
    line = bracketTrim(line,2);
    const regex = /^JSExportAs\((.+),/;
    const match = line.match(regex);
    if (!match){
      console.error("JSExportAs unable to parse: " + line);
    } else {
      line = line.replace(regex, "").replace(/\);$/, ";");
      line = parseFunc(line, match[1]);
    }
  } else if (line.startsWith("- ") || line.startsWith("+ ")) {
    line = bracketTrim(line,1);
    line = parseFunc(line);
  } else {
    return null;
  }
  return line + (comment ? " " + comment : "");
}

const tsFuncDef = (name: string, retrunType: string, args: Array<{ name: string; type: string; }>, mark: string | null | undefined) => {
  mark = mark ? mark + " " : "";
  let argText = "";

  const hints: Array<Hint> = [];

  let mapRetType = mapType(retrunType);
  if (mapRetType.hint)
    hints.push({
      type: "ret", 
      hint: mapRetType.hint,
    });

  if (args && args.length && args.length > 0)
    argText = args
      .map((v) => {
        let type = mapType(v.type);
        if (type.hint)
          hints.push({
            type: "arg",
            name: v.name,
            hint: type.hint,
          });
        return `${v.name}: ${type.name}`;
      })
      .join(", ");


  return renderHints(hints) + `${mark}${name}(${argText}): ${mapRetType.name}; `;

};

function renderHints(hints:Hint[]) {
  let hintComment;
  if (hints.length > 0) {
    hintComment =
      "/**\n" +
      hints
        .map((v) => {
          let hintStr = " * ";
          switch (v.type) {
            case "arg":
              hintStr += `@param ${v.name} ${v.hint}`;
              break;
            case "ret":
              hintStr += `@returns ${v.hint}`;
              break;
            case "prop":
              hintStr += ` ${v.hint}`;
              break;
            default:
              assertNever(v);
          }
          return hintStr;
        })
        .join("\n") +
      "\n */\n";
  } else hintComment = "";
  
  return hintComment;
}

export function parseFunc(line: string, funcName?:string) {

  const mark = line[0] === "+" ? "static" : "";
  let out = line
    .trim()
    .slice(2, -1)
    .trim() //"+ ".length and remove ";"
    .replace(/\s*\*\s*\)/g, "*)")
    .replace(/^(?!\()/, "(id)"); // https://stackoverflow.com/questions/12260374/objective-c-method-without-return-type

  const returnType = get1stBracket(out);
  if (!returnType) {
    console.error("Unable to parse: " + out);
    return "// " + out;
  }

  out = out.substring(returnType.length+2).trim();

  const args = [];
  let name: string;

  if (!/[:\(\)]/.test(out)) {
    name = out;
  } else {
    const argRegex = /(\w+?) *: *\((.+?)\) *(\w+)/g;
    let rawArgs = [...out.matchAll(argRegex)];

    const firstMatch = rawArgs[0];
    name = firstMatch[1];
    args.push({ type: firstMatch[2], name: firstMatch[3] });

    if (rawArgs.length > 1) {
      rawArgs.shift();
      args.push(
        ...rawArgs.map((match) => {
          /** {@link https://developer.apple.com/documentation/javascriptcore/jsexport#3737781} */
          name += Capitalize(match[1]);
          return { type: match[2], name: match[3] };
        })
      );
    }
  }

  return tsFuncDef(funcName??name, returnType, args, mark);
}

const tsPropDef = (name: string, type: string, mark: string | null | undefined) => {
  mark = mark ? mark.trim() + " " : "";

  name = name.trim();

  if (name.startsWith("*")){
    name = name.substring(1);
    type += "*";
  }

  if (type.endsWith("*")){
    name += "?";
  }

  const hints: Array<Hint> = [];

  const { name: typeName, hint } = mapType(type, true);

  if (hint)
    hints.push({
      type: "prop",
      hint,
    });

  return renderHints(hints) + `${mark}${name}: ${typeName}; `;
};

function parseProp(line: string) {

  let out = line
    .trim()
    .replace(/^@property\s*/, "")
    .slice(0, -1)
    .trimRight() // remove ";"
  const match = out.match(
    /^(?:\((?<prop>[^\(\)]+)\) *)?(?<type>.+) +(?<name>\*?[\w, \*]+)$/
  );
  if (match && match.groups) {
    let { prop, type, name } = match.groups;
    type = type.replace(/ /g, "");
    prop = prop && prop.includes("readonly") ? "readonly " : "";
    if (name.includes(",")) {
      return name
        .replace(/ /g, "")
        .split(",")
        .map((n) => tsPropDef(n, type, prop))
        .join("\n");
    } else return tsPropDef(name, type, prop);
  } else {
    console.error("Unable to parse: " + out);
    return "// " + out;
  }
}

/**
 *
 * @param {string} line
 */
function bracketTrim(line: string,level=1) {
  let chars = [...line];
  let nest = 0;
  let currentEnd = -1;
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i];
    if (char === ")" && ++nest === level) {
      currentEnd = i;
    } else if (char === "(" && nest-- === level) {
      let replaceStr = line
        .slice(i + 1, currentEnd)
        .replace(/ *\* */g, "*")
        .replace(/^ +| +$|(?<=\() +| +(?=\))/g, "")
        .replace(/ /g, "%20").replace(/\(/g,"%28").replace(/\)/g,"%29");
      replaceStr = "(" + replaceStr + ")";
      chars.splice(i, currentEnd - i + 1, ...replaceStr);
      currentEnd = -1;
    }
  }
  return chars.join("");
}

 function get1stBracket(line: string): string | null {
  let chars = [...line];
  let nest = 0;
  let currentStart = -1;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === "(" && ++nest === 1) {
      currentStart = i;
    } else if (char === ")" && nest-- === 1) {
      return line.slice(currentStart + 1, i);
    }
  }
  return null;
}

export const allTypes : Set<string> = new Set();

function mapType(raw:string,isProp:boolean=false) {
  const value = mapTypeCore(raw,isProp);
  allTypes.add(value.name);
  return value;
}