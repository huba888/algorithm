import { testSort } from "../13排序算法/utils";

function heapSort(arr: number[]): number[] {
  // 堆数组进行原地建立堆结构
  // 最大堆
  let n = arr.length;
  let start = Math.floor(n / 2 - 1);
  for (let i = start; i >= 0; i--) {
    heapifyDown(arr, n, i);
  }
  // 第一个和最后一个进行交换
  for (let i = n - 1; i > 0; i--) {
    // 交换之后最后一个就是最大值了
    swap(arr, i, 0);
    // 维护最大堆的特性
    heapifyDown(arr, i, 0);
  }
  return arr;
}
function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function heapifyDown(arr: number[], n: number, index: number) {
  // index 当前要进行下虑的索引
  // 只有他有右子节点的时候才进行下虑
  while (2 * index + 1 < n) {
    let leftChild = 2 * index + 1;
    let rightChild = leftChild + 1;
    let largeChild = leftChild;
    if (rightChild < n && arr[rightChild] > arr[largeChild]) {
      largeChild = rightChild;
    }
    // 判断当前位置的值 是否比 较大的孩子节点大
    if (arr[index] >= arr[largeChild]) {
      break;
    }
    // 交换index 和 largeIndex的值
    swap(arr, index, largeChild);
    index = largeChild;
  }
}

testSort(heapSort);
