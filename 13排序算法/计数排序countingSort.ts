// 之前的
// 之前的比较排序 时间复杂度最少都是nlogn
// 计数排序,桶排序,基数排序 都不是比较排序

import { testSort } from "./utils";

// 计数排序  适合对一定范围内的整数进行排序
function countingSort(arr: number[]) {
  let max = arr[0];
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
    min = Math.min(min, arr[i]);
  }
  // 统计每个元素出现的次数
  let counts = new Array(max - min + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i] - min]++;
  }
  // 累加次数
  for (let i = 1; i < counts.length; i++) {
    counts[i] = counts[i - 1] + counts[i];
  }
  // 开一个新数组 来存结果
  let res = new Array(arr.length);
  // 反过来遍历 保证数组的稳定性
  for (let i = arr.length - 1; i >= 0; i--) {
    res[--counts[arr[i] - min]] = arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = res[i];
  }
  return arr;
}
// 3,4,5,6,1,1,5
// 0 1 2 3 4 5
// 2 0 1 1 1 2
// testSort(countingSort);

console.log(countingSort([1, 6, 4, -4, 1, 0, 1, -4]));
