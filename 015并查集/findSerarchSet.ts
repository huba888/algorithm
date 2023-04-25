class FindSearchSet {
  // fa[1] = 2 // 表示节点1的父亲是2
  fa: number[] = [];
  constructor(n) {
    for (let i = 1; i <= n; i++) {
      this.fa[i] = i;
    }
  }
  // 查找一个节点 的祖先节点
  find(i: number): number {
    if (this.fa[i] !== i) {
      this.fa[i] = this.find(this.fa[i]);
    }
    return this.fa[i];
  }
  union(i: number, j: number) {
    // let i_fa = this.find(i);
    // let j_fa = this.find(j);
    // this.fa[i_fa] = j_fa;
    this.fa[this.find[i]] = this.find[j];
  }
  // 判断两个点是否联通,或者说判断两个节点是否属于一个根节点
  isConnection(i: number, j: number) {
    return this.find(i) === this.find(j);
  }
}
