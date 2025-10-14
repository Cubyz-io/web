import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalize(string: string) {
  const parts = string.split(/-| /)
  let result = `${parts[0].substring(0, 1).toUpperCase()}${parts[0].substring(1).toLowerCase()}`
  if (parts.length > 1)
    for (const part of parts.slice(1)) {
      result += ` ${part.substring(0, 1).toUpperCase()}${part.substring(1).toLowerCase()}`
    }
  return result
}
export function getCapitals(string: string) {
  return string.split(/-| /).map(word => word.charAt(0).toUpperCase()).join("");
}
export function cast(type: string, input: string)
{
  switch(type)
  {
    case "string":
      return String.bind(null, input)();
    case "number":
      return Number.bind(null, input)();
    case "boolean":
      return input == "true" ? true : false;
    case "string[]":
      return JSON.parse(input)
    default:
      throw "Unsupported type";
  }
}


export function pass(length: number = 12): string {
  const char =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const ind = Math.floor(Math.random() * char.length);
    password += char[ind];
  }
  return password;
}

export function getLocalTime(date: string) {
  return moment.utc(date).local().format("YYYY-MM-DD HH:mm:ss")
}
export function getLocalTimeUnformatted(date: Date) {
  return moment.utc(date).local()
}

export const generateId = (len = 4) => {
  // prettier-ignore
  const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  return sample(characters, len).join('');
};

export const range = function(start: string|number, end: string|number, step: number) {
  const range = [];
  let typeofStart = typeof start;
  let typeofEnd = typeof end;

  if (step === 0) {
    throw TypeError('Step cannot be zero.');
  }

  if (typeof end === 'undefined' && typeof 'step' === 'undefined') {
    end = start;
    start = 0;
    typeofStart = typeof start;
    typeofEnd = typeof end;
  }

  if (typeofStart == 'undefined' || typeofEnd == 'undefined') {
    throw TypeError('Must pass start and end arguments.');
  } else if (typeofStart != typeofEnd) {
    throw TypeError('Start and end arguments must be of same type.');
  }

  if (typeof step == 'undefined') step = 1;
  if (end < start) {
    step = -step;
  }

  if (typeofStart == 'number') {
    let startNumber = Number(start)
    while (step > 0 ? end >= start : end <= start) {
      range.push(start);
      startNumber += step;
      start = startNumber
    }
  } else if (typeofStart == 'string') {
    const startStr = String(start);
    const endStr = String(end);
    if (startStr.length != 1 || endStr.length != 1) {
      throw TypeError('Only strings with one character are supported.');
    }

    start = startStr.charCodeAt(0);
    end = endStr.charCodeAt(0);

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start));
      start += step;
    }
  } else {
    throw TypeError('Only string and number types are supported');
  }

  return range;
};
 


export const sample = (arr: string[] | number[], len = 1) => {
  const output = [];

  for (let i = 0; i < len; i++) {
    output.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return output;
};
