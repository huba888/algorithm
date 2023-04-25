import { testSort } from "./utils";

function heapSort(arr: number[]): number[] {
  // 1. 获取数组的长度
  const n = arr.length;
  // 对arr进行原地简历堆结构
  // 从第一个非叶子节点进行下虑操作
  const start = Math.floor(n / 2 - 1);
  for (let i = start; i >= 0; i--) {
    heapifyDown(arr, n, i);
  }

  // 第一个和最后一个进行交换
  for (let i = n - 1; i > 0; i--) {
    // 对最大堆进行排序的操作
    // 交换值 将最大值放到最后
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // 对0位置进行下虑操作 维护最大堆的性质
    heapifyDown(arr, i, 0);
  }
  return arr;
}
// 下虑操作
function heapifyDown(arr: number[], n: number, index: number) {
  // 有右子节点的时候才进入循环
  while (2 * index + 1 < n) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let largerChildIndex: number = leftChildIndex;
    if (rightChildIndex < n && arr[rightChildIndex] > arr[leftChildIndex]) {
      largerChildIndex = rightChildIndex;
    }
    // 判断index位置的值 是否比 较大的子节点大了
    if (arr[index] >= arr[largerChildIndex]) {
      break;
    }
    // 否则进行交换
    [arr[index], arr[largerChildIndex]] = [arr[largerChildIndex], arr[index]];
    index = largerChildIndex;
  }
}
testSort(heapSort);
