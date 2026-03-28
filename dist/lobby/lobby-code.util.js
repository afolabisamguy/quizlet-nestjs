"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLobbyCode = generateLobbyCode;
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
function generateLobbyCode(existingCodes = new Set()) {
    let code;
    do {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        const number = Math.floor(Math.random() * 900 + 100);
        code = `${word}${number}`.toUpperCase();
    } while (existingCodes.has(code));
    existingCodes.add(code);
    return code;
}
//# sourceMappingURL=lobby-code.util.js.map