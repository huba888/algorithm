class Trie {
  trie: number[][] = [];
  index: number = 0;
  // 这里也可以记录以当前字母结尾的单词 是什么 这里记录的是出现的次数
  cnt: number[] = [];
  constructor() {}
  insert(word: string): void {
    let p = 0;
    for (let i = 0; i < word.length; i++) {
      let chat = word.charCodeAt(i) - "a".charCodeAt(0);
      this.trie[p] = this.trie[p] ?? new Array(26).fill(0);
      if (!this.trie[p][chat]) {
        this.trie[p][chat] = ++this.index;
      }
      p = this.trie[p][chat];
    }
    this.cnt[p] = this.cnt[p] ? this.cnt[p] + 1 : 1;
  }
  search(word: string): boolean {
    let p = 0;
    for (let i = 0; i < word.length; i++) {
      let chat = word.charCodeAt(i) - "a".charCodeAt(0);
      if (!this.trie[p] || !this.trie[p][chat]) {
        return false;
      }
      p = this.trie[p][chat];
    }
    // 搜完了 看看有没有我们需要的单词  如果是aabb 而我们之前插入的是 aabbc会有错误 所以需要进行判断
    return this.cnt[p] !== undefined ? true : false;
  }

  startsWith(prefix: string): boolean {
    let p = 0;
    for (let i = 0; i < prefix.length; i++) {
      let chat = prefix.charCodeAt(i) - "a".charCodeAt(0);
      if (!this.trie[p] || !this.trie[p][chat]) {
        return false;
      }
      p = this.trie[p][chat];
    }
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// 输入
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// 输出
// [null, null, true, false, true, null, true]

// 解释
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // 返回 True
// trie.search("app");     // 返回 False
// trie.startsWith("app"); // 返回 True
// trie.insert("app");
// trie.search("app");     // 返回 True
