// 题目要求
// 给定一个数组,所有的数组都出现了偶数次,只有2个数字出现了奇数次,请找出这两个数组
// 要求O(n)的时间复杂度,并且常数空间
// [1,1,1,1,2,2,3,3,3,4] -> 返回 3,4
function findTwoOddCountNumber(nums: number[]) {
  let eor = 0;
  for (let i = 0; i < nums.length; i++) {
    eor ^= nums[i];
  }
  // eor == a ^ b
  // 10100 eor
  // 01011 ~eor
  // 01100 ~eor + 1
  //     10100
  //   & 01100
  // ==  00100  a 与 b 在这一位上一定不同
  let right = eor & (~eor + 1); // 找出最右侧的1
  let eor2 = 0;
  for (let i = 0; i < nums.length; i++) {
    if ((nums[i] & right) == 1) {
      eor2 ^= nums[i];
    }
  }
  return [eor2, eor ^ eor2];
}
console.log(findTwoOddCountNumber([1, 1, 1, 1, 2, 2, 3, 3, 3, 4]));
