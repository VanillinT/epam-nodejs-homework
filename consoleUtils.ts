const codes = {
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgBlue: '\x1b[44m',
  fgBlack: '\x1b[30m',
  fgWhite: '\x1b[37m',
  reset: '\x1b[0m',
};

const colorCodes = [
  codes.bgGreen + codes.fgBlack,
  codes.bgRed + codes.fgWhite,
  codes.bgBlue + codes.fgWhite,
];

export const [getGreenText, getRedText, getBlueText] = colorCodes.map(
  (colorCode) => (message: string) => colorCode + message + codes.reset,
);

export const [logSuccess, logError, logInfo] = [
  getGreenText,
  getRedText,
  getBlueText,
].map(
  (getColoredText) => (message: string) => console.log(getColoredText(message)),
);
