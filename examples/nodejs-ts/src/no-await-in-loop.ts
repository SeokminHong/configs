async function _foo(things: string[]) {
  const results = [] as string[];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await bar(thing));
  }
  return baz(results);
}

async function bar(thing: string) {
  return thing;
}

function baz(_: string[]) {}
