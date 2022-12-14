const codes = {
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgBlue: '\x1b[44m',
  fgBlack: '\x1b[30m',
  fgWhite: '\x1b[37m',
  reset: '\x1b[0m',
};

const messagePrefixes = [
  [codes.bgGreen, codes.fgBlack],
  [codes.bgRed, codes.fgWhite],
  [codes.bgBlue, codes.fgWhite],
].map((msg) => msg.join(''));

function logAndReset(...message) {
  console.log(...message, codes.reset);
}

export const [logSuccess, logError, logInfo] = messagePrefixes.map(
  (prefix) =>
    function (message) {
      logAndReset(prefix, message);
    },
);
