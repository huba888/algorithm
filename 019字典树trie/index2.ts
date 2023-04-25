let cnt: number[] = new Array(105).fill(0);
// 105是估算最后节点的个数
// trie = [[0,0....0],[0,0,....0]]
let trie: number[][] = new Array(105).fill(0).map((_) => new Array(26).fill(0));
let index = 0;
function insert(s: string) {
  let p = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i) - "a".charCodeAt(0);
    if (!trie[p][c]) {
      trie[p][c] = ++index;
    }
    p = trie[p][c];
  }
  cnt[p]++;
}
function query(s: string) {
  let p = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i) - "a".charCodeAt(0);
    if (!trie[p][c]) {
      return 0;
    }
    p = trie[p][c];
  }
  return cnt[p];
}
// 查询前缀个数
// 如输入 aab aabc aaaq aabccc
// query2(aabccc) // 得到3 aab aabc aabccc都是结果
function query2(s: string) {
  let p = 0;
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i) - "a".charCodeAt(0);
    if (!trie[p][c]) {
      break;
    }
    p = trie[p][c];
    sum += cnt[p];
  }
  return sum;
}
let words = ["code", "cook", "cook", "compare", "hope", "help"];
for (const word of words) {
  insert(word);
}
console.log(query("code"));
console.log(query("cook"));
console.log(query("cookkk"));
console.log(query("compare"));
export {};
