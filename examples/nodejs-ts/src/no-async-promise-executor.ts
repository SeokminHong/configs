import { readFile } from 'fs';

const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', (err, result) => {
    if (err) {
      reject(err as Error);
    } else {
      resolve(result);
    }
  });
  await new Promise((resolveTemp) => void resolveTemp(undefined));
});

export const result = new Promise(async (resolve) => {
  resolve(await foo);
});
