// 什么是斐波纳契数?

import task from "../shared/Task";

// 0 1 1 2 3 5 .... // 会有重复计算
function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// 优化 不会有重复计算
function fib2(n: number): number {
  if (n <= 1) return n;
  let first = 0;
  let second = 1;
  for (let i = 0; i < n - 1; i++) {
    let sum = first + second;
    first = second;
    second = sum;
  }
  return second;
}
task(() => {
  fib(45);
});
task(() => {
  fib2(45);
});
