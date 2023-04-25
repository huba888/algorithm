function maxNonOverlapping(nums: number[], target: number): number {
  // 求前缀和
  let sum = new Array(nums.length + 1).fill(0);
  for (let i = 1; i < sum.length; i++) {
    sum[i] = sum[i - 1] + nums[i - 1];
  }
  let ans = 0;
  let set = new Set();
  for (let i = 0; i < sum.length; i++) {
    if (set.has(sum[i] - target)) {
      ans++;
      set = new Set();
    }
    set.add(sum[i]);
  }
  return ans;
}
// sum[i] - sum[j] == target
// sum[j] = sum[i] - target
maxNonOverlapping([-1, 3, 5, 1, 4, 2, -9], 6);
maxNonOverlapping([1, 1, 1, 1, 1], 2);
maxNonOverlapping([-2, 6, 6, 3, 5, 4, 1, 2, 8], 10);
maxNonOverlapping([0, 0, 0], 0);
