import path from 'path';
import fs from 'fs';

const CSV_DIR_NAME = 'csv',
  TXT_DIR_NAME = 'txt';

function getFileNameWithNoExtention(filename) {
  const parts = filename.split('.');
  parts.splice(-1);
  return parts.join('.');
}

function getRelativePath(...pathParts) {
  return path.join(__dirname, ...pathParts);
}

const filterArgs = (...args) => args.filter(Boolean);
export const getCsvPath = (filename) =>
    getRelativePath(...filterArgs(CSV_DIR_NAME, filename)),
  getTxtPath = (filename) =>
    getRelativePath(...filterArgs(TXT_DIR_NAME, filename));

export const generateTargetPath = (filename) =>
  getRelativePath(TXT_DIR_NAME, getFileNameWithNoExtention(filename) + '.txt');

export function mkDir(path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}

export { readdirSync, createReadStream, createWriteStream } from 'fs';
