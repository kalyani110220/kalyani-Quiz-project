import QueryString from "qs";

export type QueryParams = string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined;

export function isNumberString (str: QueryParams) {
  return typeof str === 'string' && !isNaN(parseInt(str));
}

export function isBooleanString (str: QueryParams) {
  return typeof str === 'string' && (str === 'true' || str === 'false');
}