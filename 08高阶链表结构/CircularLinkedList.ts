import LinkedList from "./LinkedList";

class CircularLinkedList<T> extends LinkedList<T> {
  // 需要重新实现的方法
  append(value: T) {
    super.append(value);
    this.tail!.next = this.head;
  }
  insert(value: T, position: number): boolean {
    let isSuccess = super.insert(value, position);
    if ((isSuccess && position === this.length - 1) || position === 0) {
      this.tail!.next = this.head;
    }
    return isSuccess;
  }
  removeAt(position: number): T | null {
    const value = super.removeAt(position);
    if (position === 0 || position === this.length) {
      this.tail && (this.tail.next = this.head);
    }
    return value;
  }
}
