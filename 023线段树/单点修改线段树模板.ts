class NumArray {
  tree: number[];
  arr: number[];
  n: number;
  constructor(nums: number[]) {
    let n = nums.length;
    this.n = n;
    let tree = new Array(4 * n).fill(0);
    this.arr = nums;
    this.tree = tree;
    this.build(0, n - 1, 0);
  }
  // 建树
  build(l: number, r: number, p: number) {
    if (l == r) {
      this.tree[p] = this.arr[l];
      return;
    }
    let mid = (l + r) >> 1;
    this.build(l, mid, 2 * p + 1);
    this.build(mid + 1, r, 2 * p + 2);
    this.tree[p] = this.tree[2 * p + 1] + this.tree[2 * p + 2];
  }
  change(pos: number, val: number, l: number, r: number, p: number) {
    if (l == r) {
      this.tree[p] = val;
      return;
    }
    let mid = (l + r) >> 1;
    if (pos <= mid) {
      this.change(pos, val, l, mid, 2 * p + 1);
    } else {
      this.change(pos, val, mid + 1, r, 2 * p + 2);
    }
    this.tree[p] = this.tree[2 * p + 1] + this.tree[2 * p + 2];
  }
  update(index: number, val: number): void {
    this.change(index, val, 0, this.n - 1, 0);
  }
  query(A: number, B: number, l: number, r: number, p: number) {
    if (A <= l && r <= B) {
      return this.tree[p];
    }
    let mid = (l + r) >> 1;
    let ans = 0;
    if (A <= mid) {
      ans += this.query(A, B, l, mid, 2 * p + 1);
    }
    if (B >= mid + 1) {
      ans += this.query(A, B, mid + 1, r, 2 * p + 2);
    }
    return ans;
  }
  sumRange(left: number, right: number): number {
    return this.query(left, right, 0, this.n - 1, 0);
  }
}
