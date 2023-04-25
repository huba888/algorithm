class MinRMQ {
  st: number[][];
  constructor(arr: number[]) {
    let n = arr.length;
    let k = Math.floor(Math.log2(n));
    let st = new Array(n).fill(0).map((_) => new Array(k).fill(0));
    for (let i = 0; i < arr.length; i++) {
      st[i][0] = arr[i];
    }
    for (let j = 1; j <= k; j++) {
      for (let i = 0; i < n - (1 << j) + 1; i++) {
        st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
      }
    }
    this.st = st;
  }
  query(l: number, r: number) {
    let x = Math.floor(Math.log2(r - l + 1));
    return Math.min(this.st[l][x], this.st[r - (1 << x) + 1][x]);
  }
}
let arr = [1, 234, 23, 412, 51, 253, 21];
let rmq = new MinRMQ(arr);
console.log(rmq.query(1, 2));
console.log(rmq.query(0, 6));
