function findMissingMinPositiveInteger(arr: number[]) {
  // 1.找到最大的正整数
  let maxNum = Math.max(...arr);
  // 2. 记录哪些数字出现过
  let memoArr = new Array(maxNum);
  for (let num of arr) {
    if (num <= 0) continue;
    memoArr[num] = 1;
  }
  // 3. 返回第一次没出现的数字
  for (let i = 1; i < memoArr.length; i++) {
    if (memoArr[i] === undefined) {
      return i;
    }
  }
  return -1;
}
if (findMissingMinPositiveInteger([1, 3, 5, -1]) == 2) {
  console.log("test1 passed");
} else {
  console.log("test1 NoPassed");
}
if (findMissingMinPositiveInteger([-1, 0, 5, -1]) == 1) {
  console.log("test1 passed");
} else {
  // console.log("test1 NoPassed");
}
if (findMissingMinPositiveInteger([-1, 2, 1, -1]) == -1) {
  // console.log("test1 passed");
} else {
  // console.log("test1 NoPassed");
}
