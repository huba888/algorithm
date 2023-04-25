import { testSort } from "./utils";

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  // 分解 divide
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);
  // 合并merge
  let i = 0;
  let j = 0;
  const newArr: number[] = [];
  while (i < newLeftArr.length || j < newRightArr.length) {
    const leftValue = newLeftArr[i] ?? Infinity;
    const rightValue = newRightArr[j] ?? Infinity;
    // 把小的放入数组
    if (leftValue <= rightValue) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }
  return newArr;
}

testSort(mergeSort);
// 递归的Master公式
// T(n) = a*T(N/b) + O(N^d)
// log(b,a) > d --> 复杂度O(N^log(b,a))
// log(b,a) == d  ---> O(N ^ d * logN)
// log(b,a) < d   ---> O(N ^ d)