import LinkedList from "./LinkedList";
import { DoublyNode } from "./LinkedNode";
class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null;
  append(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      // 不能将一个父类的对象子类的类型
      // 但是可以将子类的对象赋值给父类的对象
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }
  prepend(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }
  postTraverse() {
    const values: T[] = [];
    let current = this.tail;
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
  }
  // 根据索引插入元素
  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.length) return false;
    if (position === 0) {
      this.prepend(value);
    } else if (position === this.length) {
      this.append(value);
    } else {
      const newNode = new DoublyNode(value);
      const current = this.getNode(position) as DoublyNode<T>;
      current.prev!.next = newNode;
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev = newNode;
    }
    this.length++;
    return true;
  }
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length) return null;
    let res: T | null = null;
    if (position === 0) {
      res = this.head!.value;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head!.next;
        this.head!.prev = null;
      }
    } else if (position === this.length - 1) {
      res = this.tail!.value;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      // 删除一个元素在中间的情况 做一次类型的转换
      let current = this.getNode(position) as DoublyNode<T>;
      res = current.value;
      current.next!.prev = current.prev;
    }
    this.length--;
    return res;
  }
}
