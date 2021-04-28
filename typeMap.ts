export interface typesTest<K extends string = string, V extends RegExp = RegExp>
  extends Map<K, V> {
  test(this: typesTest, src:string): { name: string; hint?: string } | null;
}

const simple = new Map([
  ["boolean", /^(BOOL)\*?$/],
  ["Date", /^(NSDate)\*?$/],
  ["number | boolean", /^(NSNumber)\*?$/],
  ["null", /^(NSNull)\*?$/],
  ["DictObj", /^(NSDictionary)\**$/],
  [
    "string",
    /^(?:out )?(NSString)\**$|^(?:const )?(?:unsigned )?((?:uni)?char)\*?$|^UTF32Char$/,
  ],
]) as typesTest;
simple.test = function (this: typesTest, src:string): { name: string; hint?: string }  | null{
  for (let [typeName, regex] of this.entries()) {
    if (regex.test(src)){
      const match = src.match(regex) as RegExpMatchArray;
      return {
        name: typeName,
        hint: match[0] !== match[1] ? src : undefined,
      };
    }
  }
  return null;
}.bind(simple);

const generics = new Map([
  ["Array", /^(NSArray)(?:<(?<ofType>\w+\*?)>)?\*?$/],
  ["WrapperObj", /^(id)(?:<(?<ofType>\w+\*?)>)?\*?$/],
]) as typesTest;
generics.test = function (this: typesTest, src:string): { name: string; hint?: string }  | null{
  for (let [typeName, regex] of this.entries()) {
    if (regex.test(src)){
      const match = src.match(regex) as RegExpMatchArray;
      let ofType = match?.groups?.ofType;
      if (ofType){
        ofType = `<${mapType(ofType).name}>`;
      } else {
        ofType = "<any>";
      }
      return {
        name: typeName + ofType,
        hint: match[0] !== match[1] ? src : undefined,
      };
    }
  }
  return null;
}.bind(generics);

const hintAll = new Map([
  [
    "number",
    /^(?:const )?(?:unsigned )?(?:long )*(?:u?int\d{1,2}_t|int|short|long|double|float)\*?$|^(?:unsigned|size_t|NSInteger)\*?$/,
  ],
]) as typesTest;
hintAll.test = function (this: typesTest, src:string): { name: string; hint?: string }  | null{
  for (let [typeName, regex] of this.entries()) {
    if (regex.test(src)){
      return {
        name: typeName,
        hint: src,
      };
    }
  }
  return null;
}.bind(hintAll);

const map = [ simple, generics, hintAll ];

export function mapType(raw: string): { name: string; hint?: string; } {
  let src = raw
    .trim()
    .replace(/%20/g, " ")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/\s+(?=[<,])|(?<=,)\s+/g,"");

  for (const item of map) {
    let result = item.test(src);
    if (result) return result;
  }

  if (src.endsWith("*"))
    return {
      name: src.replace(/\*+$/, ""),
      hint: src,
    };
  else
    return {
      name: src
    };
}