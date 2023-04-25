import Heap from "../09Heap堆结构/Heap";

class PriorityNode<T> {
  constructor(public value: T, public priority: number) {}
  valueOf() {
    return this.priority;
  }
}
class PriorityQueue<T> {
  private heap: Heap<PriorityNode<T>> = new Heap();
  enqueue(value: T, priority: number): void {
    const newNode = new PriorityNode<T>(value, priority);
    this.heap.insert(newNode);
  }
  dequeue(): T | undefined {
    return this.heap.extract()?.value;
  }
  peek(): T | undefined {
    return this.heap.peek()?.value;
  }
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }
  size(): number {
    return this.heap.size();
  }
}
