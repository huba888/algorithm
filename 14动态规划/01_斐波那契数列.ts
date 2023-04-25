// 递归实现斐波那契数列
function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(10));
// 记忆化数组
function fib1(n: number, memo: number[] = [0, 1]): number {
  if (memo[n]) {
    return memo[n];
  }
  const res = fib1(n - 1, memo) + fib1(n - 2, memo);
  memo[n] = res;
  return res;
}
// 动态规划的解法
function fib2(n: number): number {
  let memo = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}
// 动态规划状态压缩

function fib3(n: number): number {
  if (n <= 1) return n;
  let prev = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    let newValue = prev + cur;
    prev = cur;
    cur = newValue;
  }
  return cur;
}
