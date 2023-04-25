class RMAXQ {
  private st: number[][];
  constructor(arr: number[]) {
    let n = arr.length;
    let k = Math.floor(Math.log2(n));
    // 初始化st表
    let st = new Array(n).fill(0).map((_) => new Array(k).fill(0));
    for (let i = 0; i < arr.length; i++) {
      st[i][0] = arr[i];
    }
    for (let j = 1; j <= k; j++) {
      for (let i = 0; i < n - (1 << j) + 1; i++) {
        st[i][j] = Math.max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
      }
    }
    this.st = st;
  }
  query(l: number, r: number) {
    let x = Math.floor(Math.log2(r - l + 1));
    return Math.max(this.st[l][x], this.st[r - (1 << x) + 1][x]);
  }
}
let arr = [
  1, 2, 4, 4, 4, 21512, 5, 12521, 35, 1235, 21, 53, 12, 35, 213, 5, 1235, 12,
  35, 123, 521, 35, 12, 35, 2135, 12, 35, 21, 3512, 35, 1264576, 43, 572, 34567,
  23, 46, 23, 46, 26, 423, 46, 234, 6, 2346, 23, 46, 234, 672, 37, 27, 23, 7,
  543, 73, 457, 34, 57, 347, 53, 457, 34, 57, 34, 573, 7, 38, 34, 8, 645, 3456,
  2346, 23, 45, 23, 542, 54, 2, 5,
];

let rmq = new RMAXQ(arr);
console.log(rmq.query(0, 1));
export {};
