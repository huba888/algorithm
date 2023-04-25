let arr = [5, 2, 6, 1];
class BIT {
  tree: number[];
  n: number;
  constructor(n: number) {
    this.n = n;
    let tree = new Array(n + 1).fill(0);
    this.tree = tree;
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
  query(i: number): number {
    let res = 0;
    for (let j = i; j > 0; j -= this.lowbit(j)) {
      res += this.tree[j];
    }
    return res;
  }
}
// 离散化我们的数组
let set = new Set(arr);
// 去重,排序
// [1,2,5,6]
let nums = [...set];
nums.sort((a, b) => a - b);
// 求一个数的排名
let map = new Map();
let rank = 1;
for (const num of nums) {
  map.set(num, rank);
  rank++;
}
console.log(map);
let bit = new BIT(set.size);
let res: number[] = [];
for (let i = arr.length - 1; i >= 0; i--) {
  let rank: number = map.get(arr[i]);
  // 在树状数组中的位置加1
  bit.add(rank, 1);
  // 求小于等于当前排名的元素有多少个
  res.unshift(bit.query(rank - 1));
}
export {};
