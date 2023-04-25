// 8 2
function fun(num: number) {
  let set = new Set();
  for (let i = 2; i * i < num && num > 1; i++) {
    if (num % i === 0) {
      set.add(i);
      while (num % i == 0) {
        num = num / i;
      }
    }
  }
  if (num !== 1) {
    set.add(num);
  }
  return [...set];
}
// 2
// 34 

// 17
console.log(fun(34));
console.log(fun(8));
