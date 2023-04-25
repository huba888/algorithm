import ILinkedList from "./ILinkedList";

class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> implements ILinkedList<T> {
  peek(): T | undefined {
    return this.head?.value;
  }
  protected head: Node<T> | null = null;
  protected tail: Node<T> | null = null;
  protected length: number = 0;
  protected getNode(position: number): Node<T> | null {
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current?.next;
    }
    return current;
  }
  private isTail(node: Node<T>) {
    return this.tail === node;
  }
  size(): number {
    return this.length;
  }
  // 链表本身为空
  // 链表本身不为空
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head) {
      // 链表本身没有节点
      this.head = newNode;
    } else {
      this.tail!.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }
  insert(value: T, position: number): boolean {
    // 对边界进行判断
    if (position < 0 || position > this.length) {
      return false; // 插入失败
    }
    // 1.创建一个新的节点
    const newNode = new Node(value);
    // 判断是否插入头部
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const previous = this.getNode(position - 1);
      newNode.next = previous!.next;
      previous!.next = newNode;
      if (position === this.length) {
        this.tail = newNode;
      }
    }
    this.length++;
    return true;
  }
  // 删除方法
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = this.head;
    if (position === 0) {
      this.head = current?.next ?? null;
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      let previous: Node<T> | null = this.getNode(position - 1);
      current = previous!.next;
      previous!.next = previous?.next?.next ?? null;
      if (position === this.length - 1) {
        this.tail = previous;
      }
    }
    this.length--;
    return current?.value ?? null;
  }
  // 删除方法
  remove(value: T): T | null {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }
  get(position: number): T | null {
    if (position < 0 || position >= this.length) {
      return null;
    }

    return this.getNode(position)?.value ?? null;
  }
  traverse() {
    let current = this.head;
    let values: T[] = [];
    while (current) {
      values.push(current.value);
      if (this.isTail(current)) {
        // 最后一个节点了
        current = null;
      } else {
        current = current.next;
      }
    }
    // 只有是循环链表的时候才需要
    if (this.head && this.tail?.next == this.head) {
      values.push(this.head.value);
    }
    console.log(values.join("--->"));
  }
  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.length) return false;
    const current = this.getNode(position);
    current!.value = value;
    return true;
  }
  indexOf(value: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      if (this.isTail(current)) {
        current = null;
      } else {
        current = current.next;
      }
      index++;
    }
    return -1;
  }
  isEmpty() {
    return this.length === 0;
  }
}
const linkedList = new LinkedList();
linkedList.append("aaa");
linkedList.append("bbb");
linkedList.append("ccc");
linkedList.append("ddd");
linkedList.insert("cba", 3);
linkedList.removeAt(3);
console.log(linkedList.get(2));
linkedList.update("huba", 1);
console.log(linkedList.indexOf("huba"));
linkedList.traverse();
export default LinkedList;
export {};
