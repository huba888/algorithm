import ArrayQueue from "../02Queue/Queue";

class Deque<T> extends ArrayQueue<T> {
  thi;
  addFront(value: T): void {
    this.data.unshift(value);
  }
  removeBack(): T | undefined {
    return this.data.pop();
  }
}
export default Deque;
