import { testSort } from "./utils";

function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minValueIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[minValueIndex] > arr[j] && (minValueIndex = j);
    }
    if (i !== minValueIndex) {
      [arr[minValueIndex], arr[i]] = [arr[i], arr[minValueIndex]];
    }
  }
  return arr;
}

testSort(selectionSort);
