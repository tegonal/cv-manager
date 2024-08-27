import { readFile } from 'fs/promises';
import * as mime from 'mime-types';

export const fileToBase64 = async (filename: string) => {
  try {
    const file = await readFile(filename);
    const mimetype = mime.lookup(filename);
    const base64 = Buffer.from(file).toString('base64');
    return `data:${mimetype};base64,${base64}`;
  } catch (error) {
    console.log(error);
    return '';
  }
};
