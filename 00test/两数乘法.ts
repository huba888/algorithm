function multiply(num1: string, num2: string): string {
  function increment(a: string, b: string) {
    let i = a.length - 1;
    let j = b.length - 1;
    let carr = 0;
    let res = "";
    while (i >= 0 || j >= 0) {
      let num1 = i < 0 ? 0 : Number(a[i]);
      let num2 = j < 0 ? 0 : Number(b[j]);
      let sum = num1 + num2 + carr;
      let mod = sum % 10;
      carr = Math.floor(sum / 10);
      res = mod + res;
      i--;
      j--;
    }
    if (carr) {
      res = carr + res;
    }
    return res;
  }
  // 用num2 的每一位 去乘 num1 的每一位
  // 前提是num2.length <= num1.length
  if (num2.length > num1.length) {
    [num1, num2] = [num2, num1];
  }
  let zero = "";
  let res = "";
  for (let i = num2.length - 1; i >= 0; i--) {
    let current = Number(num2[i]);
    let carry = 0;
    let temp = "";
    for (let j = num1.length - 1; j >= 0; j--) {
      let mul = current * Number(num1[j]) + carry;
      carry = Math.floor(mul / 10);
      let mod = mul % 10;
      temp = mod + temp;
    }
    if (carry > 0) {
      temp = carry + temp;
    }
    temp = temp + zero;
    zero = zero + "0";
    res = increment(res, temp);
  }
  return res;
}
console.log(
  multiply(
    "12312312312312312312",
    "4234131431234124123421432342100000000003412356"
  )
);
console.log(
  4234131431234124123421432342100000000003412356 * 12312312312312312312
);
