class PriorityQueue<T> {
  private heap: Heap<T> = new Heap();
  enqueue(value: T): void {
    this.heap.insert(value);
  }
  dequeue(): T | undefined {
    return this.heap.extract();
  }
  peek(): T | undefined {
    return this.heap.peek();
  }
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }
  size(): number {
    return this.heap.size();
  }
}
export {};
