// a ^ b
// 5 ^ 13
// 5 ^ (1101)2
// 5 ^ (1000)2 * 5 ^ (100)2 * 5 ^ (1)2
// 5 ^ 100 次方
// 如何快速求解, 使用更少的乘法步骤
function quick_pow(a: number, b: number) {
  let ans = 1;
  while (b) {
    if (b & 1) {
      ans *= a;
    }
    b = b >> 1;
    a *= a;
  }
  return ans;
}
// 怕超过最大位置
function quick_pow2(a: number, b: number, p: number) {
  let ans = 1;
  while (b) {
    if (b & 1) {
      ans = (ans * a) % p;
    }
    b = b >> 1;
    a = (a * a) % p;
  }
  return ans;
}
console.log(quick_pow(5, 13));
function myPow(x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let res = 1;
  while (n) {
    if (n & 1) {
      res *= x;
    }
    n = n >>> 1;
    x *= x;
  }
  return res;
}
