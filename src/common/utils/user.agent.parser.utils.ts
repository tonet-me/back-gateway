import * as uaParser from 'ua-parser-js';

export function getUserAgent(uaString: string): any {
  return uaParser(uaString);
}
