import {deflate, inflate} from "pako";

export function encodeFormState(values: object): string {
  return btoa(String.fromCharCode(...deflate(JSON.stringify(values))));
}

export function decodeFormState(formString: string): object {
  const bytes = Uint8Array.from(atob(formString), (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(inflate(bytes)));
}