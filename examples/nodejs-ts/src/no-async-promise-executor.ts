import { readFile } from 'fs';

const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function (err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const _result = new Promise(async (resolve) => {
  resolve(await foo);
});
