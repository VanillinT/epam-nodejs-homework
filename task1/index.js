import { logInfo } from '../consoleUtils';

const { stdin, stdout } = process;

const write = (str) => stdout.write(str),
  writeln = (str = '') => write(str + '\n'),
  reverse = (str) => [...str].reverse().join(''),
  sanitize = (str) => str.replace(/\s+/g, ' ').trim();

function removeTrailingLine() {
  stdout.moveCursor(0, -1);
  stdout.clearLine();
}

function setup() {
  console.clear();
  stdin.setEncoding('utf-8');
  logInfo('Waiting for input...');
}

function init() {
  stdin.on('data', function (data) {
    const sanitizedMessage = sanitize(data.toString());
    if (!sanitizedMessage.length) return;

    removeTrailingLine();
    writeln(`${sanitizedMessage} ⟶ ${reverse(sanitizedMessage)}`);
  });
}

setup();
init();
