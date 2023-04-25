// 实现一个最大堆
class Heap<T> {
  private data: T[] = [];
  private length: number = 0;
  constructor(arr: T[] = []) {
    this.buildHeap(arr);
  }
  // 交换两个位置的元素 data
  private swap(i: number, j: number) {
    let temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  insert(value: T) {
    this.data.push(value);
    this.length++;
    // 维护最大堆的特性,进行上滤
    this.heapify_up();
  }
  heapify_up() {
    let index = this.length - 1;
    while (index > 0) {
      // parentIndex = Math.floor((index - 1) / 2);
      let prentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] <= this.data[prentIndex]) {
        break;
      }
      this.swap(index, prentIndex);
      index = prentIndex;
    }
  }
  heapify_down(start: number = 0) {
    // 3.1 定义索引位置
    let index = start;
    // 什么时候进入循环? 有左边子节点的时候
    while (2 * index + 1 < this.length) {
      // 3.2 找到左右子节点
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;

      // 3.3 找到左右子节点中较大的值 的索引
      let largerIndex = leftChildIndex;
      if (
        rightChildIndex < this.length &&
        this.data[rightChildIndex] > this.data[leftChildIndex]
      ) {
        largerIndex = rightChildIndex;
      }
      // 较大的值和index比较
      if (this.data[largerIndex] <= this.data[index]) {
        break;
      }
      // 交换位置
      this.swap(largerIndex, index);
      index = largerIndex;
    }
  }
  // 就是删除操作 提取valueTop
  extract(): T | undefined {
    // 判断元素个数为0或者1
    if (this.length === 0) {
      return undefined;
    }
    if (this.length === 1) {
      this.length--;
      return this.data.pop();
    }
    //
    const topValue = this.data[0];
    this.data[0] = this.data.pop()!;
    this.length--;
    // 维护最大堆的特性下虑
    this.heapify_down(0);
    return topValue;
  }
  peek(): T | undefined {
    return this.data[0];
  }
  size(): number {
    return this.length;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
  // 原地建堆
  // 在原来的基础上
  buildHeap(arr: T[]): void {
    this.data = arr;
    this.length = arr.length;
    // 从第一个非叶子节点 进行下虑操作
    // 自下而上的 进行下虑操作
    const start = Math.floor(this.size() / 2 - 1);
    for (let i = start; i >= 0; i--) {
      this.heapify_down(i);
    }
  }
}

export default Heap;

// 原地建堆

// 自下而上的下虑 从第一非叶子节点开始下虑 (n >> 1) / 2 到第一个节点 ()
// 自上而下的上虑 从第2个 Index 为1 的节点开始 上虑 到最后一个节点
