import csv from 'csvtojson';
import { logError, logSuccess } from '../consoleUtils';
import {
  getCsvPath,
  generateTargetPath,
  getTxtPath,
  mkDir,
  readdirSync,
  createReadStream,
  createWriteStream,
} from './utils';

const relativeCsvPath = getCsvPath(),
  relativeTxtPath = getTxtPath();

const handleWriteError = (error) => {
  if (error) logError(error);
};

function setup() {
  console.clear();
  [relativeCsvPath, relativeTxtPath].forEach(mkDir);
}

function processCsvDir() {
  const filenames = readdirSync(relativeCsvPath);

  for (const filename of filenames) {
    const readStream = createReadStream(getCsvPath(filename), {}),
      writeStream = createWriteStream(generateTargetPath(filename));

    csv()
      .fromStream(readStream)
      .on('data', (data) => writeStream.write(data, handleWriteError))
      .on('error', logError)
      .on('end', () => logSuccess('Processing completed'));
  }
}

setup();
processCsvDir();
