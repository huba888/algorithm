class BIT {
  tree: number[];
  n: number;
  constructor(arr: number[]) {
    let n = arr.length;
    this.n = n;
    let tree = new Array(n + 1).fill(0);
    this.tree = tree;
    for (let i = 1; i <= n; i++) {
      this.add(i, arr[i - 1]);
    }
  }
  lowbit(x: number) {
    return x & -x;
  }
  add(i: number, val: number) {
    for (let j = i; j < this.n; j += this.lowbit(j)) {
      this.tree[j] += val;
    }
  }
  // 查询1 到i的值
  query(i: number) {
    let res = 0;
    for (let j = i; j > 0; j -= this.lowbit(j)) {
      res += this.tree[j];
    }
    return res;
  }
}
let arr = [1, 2, 3, 4, 5, 6];
let bit = new BIT(arr);
console.log(bit.query(2));
bit.add(1, 3);
console.log(bit.query(2));
console.log(bit.query(1));
