// 希尔排序底层使用插入排序
import { testSort } from "./utils";
function shellSort(arr: number[]) {
  let steps: number[] = [];
  let n = arr.length;
  while ((n >>= 1) > 0) {
    steps.push(n);
  }
  for (const step of steps) {
    // 利用步长序列进行排序
    // col 第几列
    for (let col = 0; col < step; col++) {
      // 对第col列进行排序
      // 插入排序
      for (let begin = col + step; begin < arr.length; begin += step) {
        let cur = begin;
        while (cur > 0 && arr[cur] < arr[cur - step]) {
          swap(arr, cur, cur - step);
          cur -= step;
        }
      }
    }
  }
  return arr;
}
function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
testSort(shellSort);
