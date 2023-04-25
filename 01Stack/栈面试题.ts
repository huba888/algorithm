// 十进制 转为 二进制

import ArrayStack from "./Stack";

// 除2取余,倒叙输出
function decmialToBinary(decimal: number): string {
  const stack = new ArrayStack<number>();
  while (decimal > 0) {
    const result = decimal % 2;
    stack.push(result);
    decimal = Math.floor(decimal / 2);
  }
  let res = "";
  while (!stack.isEmpty()) {
    res += stack.pop();
  }
  return res;
}

console.log("-----------");

console.log(decmialToBinary(35));
// 有效的括号
// 给定一个只包含(,),[,],{,}的字符串s 判断字符串是否有效
function isValid(s: string): boolean {
  let map: { [s: string]: string } = { "(": ")", "{": "}", "[": "]" };
  let stack = new ArrayStack<string>();
  for (const char of s) {
    if (char in map) {
      stack.push(map[char]);
    } else {
      let charPop = stack.pop();
      if (charPop !== char) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}
console.log(isValid("()[]{}"));
console.log(isValid("{}{]"));
