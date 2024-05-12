const x = 0 as number;

if (x === -0) {
  foo(x);
}

function foo(v: number) {
  return v + 1;
}
