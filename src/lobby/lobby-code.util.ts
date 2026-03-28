// lobby-code.util.ts
const WORDS = [
  'Fuzzy',
  'Happy',
  'Swift',
  'Crazy',
  'Lucky',
  'Mighty',
  'Bold',
  'Chill',
  'Brave',
  'Epic',
  'Magic',
  'Noble',
  'Quick',
  'Silent',
  'Wild',
  'Zen',
];

/**
 * Generate a unique lobby code like 'FUZZY123'
 * @param existingCodes Set of already used codes to ensure uniqueness
 */
export function generateLobbyCode(
  existingCodes: Set<string> = new Set(),
): string {
  let code: string;

  do {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const number = Math.floor(Math.random() * 900 + 100); // random 100-999
    code = `${word}${number}`.toUpperCase();
  } while (existingCodes.has(code));

  existingCodes.add(code); // mark as used
  return code;
}
