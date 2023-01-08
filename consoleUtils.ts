const codes = {
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgBlue: '\x1b[44m',
  fgBlack: '\x1b[30m',
  fgWhite: '\x1b[37m',
  reset: '\x1b[0m',
};

export const [logSuccess, logError, logInfo] = [
  codes.bgGreen + codes.fgBlack,
  codes.bgRed + codes.fgWhite,
  codes.bgBlue + codes.fgWhite,
].map((colorCode) => (message: string) => {
  console.log(colorCode, message, codes.reset);
});
