let flag = new Array(1000).fill(false);
for (let i = 2; i < 1000; i++) {
  for (let j = i + i; j < 1000; j += i) {
    flag[j] = true;
  }
}
console.log(flag);
