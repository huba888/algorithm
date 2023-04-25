class Trie {
  root: Node;
  constructor() {
    this.root = new Node();
  }
  insert(s: string) {
    let node = this.root;
    for (let i = 0; i < s.length; i++) {
      let index = s.charCodeAt(i) - "a".charCodeAt(0);
      if (!node.children[index]) {
        node.children[index] = new Node();
      }
      node = node.children[index];
    }
    node.cnt++;
  }
  search(s: string) {
    let node = this.root;
    for (let i = 0; i < s.length; i++) {
      let index = s.charCodeAt(i) - "a".charCodeAt(0);
      if (!node.children[index]) {
        return 0;
      }
      node = node.children[index];
    }
    return node.cnt;
  }
}
class Node {
  cnt: number = 0;
  children: {
    [index: number]: Node;
  } = {};
}
let words = ["code", "cook", "cook", "compare", "hope", "help"];
let trie = new Trie();
for (const word of words) {
  trie.insert(word);
}
console.log(trie.search("code"));
console.log(trie.search("cook"));
console.log(trie.search("help"));
console.log(trie.search("nihao"));
export {};

export {};
