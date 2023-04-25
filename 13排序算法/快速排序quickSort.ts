import { testSort } from "./utils";

function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);
  function partition(left: number, right: number) {
    if (left >= right) return;
    // 1. 找到基准元素 pivot (轴心)
    const pivot = arr[right];
    let i = left;
    let j = right - 1;
    while (i <= j) {
      while (arr[i] < pivot) {
        i++;
      }
      while (arr[j] > pivot) {
        j--;
      }
      // 交换
      if (i <= j) {
        [arr[j], arr[i]] = [arr[i], arr[j]];
        i++;
        j--;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    partition(left, j);
    partition(i + 1, right);
  }
  return arr;
}

testSort(quickSort);
