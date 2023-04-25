// 对个位数 十位数百位数万位数进行排序(从低位到高位)

import { testSort } from "./utils";

// 基数排序 是基于 计数排序的
function radixSort(arr: number[]) {
  let max = Math.max(...arr);
  for (let divider = 1; divider <= max; divider *= 10) {
    countingSort(arr, divider);
  }
  return arr;
}
// 对每一位进行计数排序
function countingSort(arr: number[], divider: number) {
  // 统计每个元素出现的次数
  let counts = new Array(10).fill(0);
  for (let i = 0; i < arr.length; i++) {
    counts[Math.floor(arr[i] / divider) % 10]++;
  }
  // 累加次数
  for (let i = 1; i < counts.length; i++) {
    counts[i] = counts[i - 1] + counts[i];
  }
  // 开一个新数组 来存结果
  let res = new Array(arr.length);
  // 反过来遍历 保证数组的稳定性
  for (let i = arr.length - 1; i >= 0; i--) {
    res[--counts[Math.floor(arr[i] / divider) % 10]] = arr[i];
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = res[i];
  }
  return arr;
}
testSort(radixSort);
