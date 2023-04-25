function removeInvalidParentheses(s: string): string[] {
  // 写一个valid函数，判断是否合理
  function isValid(s: string): boolean {
    let l = 0;
    let r = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] == "(") {
        l++;
      } else if (s[i] == ")") {
        r++;
      }
      if (l < r) return false;
    }
    return l == r;
  }
  let set = new Set<string>([s]);
  let res = [];
  while (1) {
    for (const s of set) {
      if (isValid(s)) {
        res.push(s);
      }
    }
    if (res.length > 0) return res;
    // 如果没有返回,那么我们继续删除括号
    let temp = new Set<string>();
    for (const s of set) {
      for (let i = 0; i < s.length; i++) {
        // 把 i 位置的元素删除了
        temp.add(s.slice(0, i) + s.slice(i + 1));
      }
      拦截原因:订单的结算方式要求必须“已付款”，订单付款状态：未付款}
    set = temp;
  }
  return [""];
}
console.log(removeInvalidParentheses("()())()"));