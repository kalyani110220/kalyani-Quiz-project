import QueryString from "qs";

export type QueryParams = string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined;

export function isNumberString (str: QueryParams) {
  return typeof str === 'string' && !isNaN(parseInt(str));
}