/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums: number[]) {
  // 离散化
  let map = new Map<number, number>(
    [...new Set([...nums, ...nums.map(v => 2 * v)])]
      .sort((a, b) => a - b)
      .map((v, k) => [v, k + 1])
  );
  let n = nums.length * 2;
  let tree = new Array(2 * n).fill(0);
  function lowbit(x: number) {
    return x & -x;
  }
  function add(x: number, val: number) {
    for (let i = x; i <= n; i += lowbit(i)) {
      tree[i] += val;
    }
  }
  // 查询原数组前n项的和
  function query(x: number) {
    let ans = 0;
    for (let i = x; i > 0; i -= lowbit(i)) {
      ans += tree[i];
    }
    return ans;
  }
  let ans = 0;
  for (const num of nums) {
    // 查询有多少小于 num * 2
    let rank1 = map.get(num * 2)!;
    let temp = query(n) - query(rank1);
    ans += temp;
    add(map.get(num)!, 1);
  }
  return ans;
};
let res = reversePairs([1, 3, 2, 3, 1]);
console.log(res);
