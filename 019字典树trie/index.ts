class TrieNode {
  son: TrieNode[] = new Array(26).fill(null); // 当前节点的孩子
  cnt: number = 0; // 以当前节点为结尾的单词个数
}

let root = new TrieNode();
function insert(s: string) {
  let p = root;
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i) - "a".charCodeAt(0);
    if (!p.son[c]) {
      p.son[c] = new TrieNode();
    }
    p = p.son[c];
  }
  p.cnt++;
}
function query(s: string) {
  let p = root;
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i) - "a".charCodeAt(0);
    if (!p.son[c]) {
      return 0;
    }
    p = p.son[c];
  }
  return p.cnt;
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
