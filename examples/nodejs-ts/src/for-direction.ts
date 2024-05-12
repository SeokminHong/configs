for (let i = 0; i < 10; i--) {
  foo(i);
}

for (let i = 10; i >= 0; i++) {
  foo(i);
}

for (let i = 0; i > 10; i++) {
  foo(i);
}

for (let i = 0; i < 10; i--) {
  foo(i);
}

const n = -2;
for (let i = 0; i < 10; i += n) {
  foo(i);
}

function foo(v: number) {
  return v;
}
