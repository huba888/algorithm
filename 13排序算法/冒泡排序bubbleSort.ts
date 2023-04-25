import { swap, testSort } from "./utils";

function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    // 如果有一轮没有进行任何交换 说明已经有序了 直接跳出循环
    let swaped = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swaped = true;
      }
    }
    if (!swaped) break;
  }
  return arr;
}

testSort(bubbleSort);
