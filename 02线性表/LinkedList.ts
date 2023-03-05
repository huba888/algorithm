import AbstractList from "./AbstractList";
import List from "./List";
//
class Node<E> {
  element: E;
  next: Node<E> | null;
  constructor(element: E, next: Node<E> | null = null) {
    this.element = element;
    this.next = next;
  }
}
class LinkedList<E> extends AbstractList<E> {
  public firstNode: Node<E> | null;
  constructor(firstNode: Node<E> | null = null) {
    super();
    this.firstNode = firstNode;
  }
  clear(): void {
    this.size = 0;
    this.firstNode = null;
  }
  isEmpty(): boolean {
    throw new Error("Method not implemented.");
  }
  get(index: number): E {
    return this.node(index).element;
  }
  set(index: number, element: E): E {
    let node = this.node(index);
    let old = node.element;
    node.element = element;
    return old;
  }
  addByIndex(index: number, element: E): void {
    this.rangeCheck(index);
    let newNode = new Node<E>(element);
    // 链表位置的时候必须要注意
    if (index === 0) {
      newNode.next = this.firstNode;
      this.firstNode = newNode;
    } else {
      let prevNode = this.node(index - 1);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
    }
    this.size++;
  }
  private node(index: number): Node<E> {
    this.rangeCheck(index);
    let current = this.firstNode;
    while (index--) {
      current = current!.next;
    }
    return current!;
  }
  remove(index: number): E {
    this.rangeCheck(index);
    let value: E;
    if (index == 0) {
      value = this.firstNode!.element;
      this.firstNode = this.firstNode!.next;
    } else {
      let node = this.node(index - 1);
      value = node.next!.element;
      node.next = node.next!.next;
    }
    this.size--;
    return value;
  }
  indexOf(element: E): number {
    let current = this.firstNode;
    let index = 0;
    while (current) {
      if (current.element == element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return this.ELEMENT_NOT_FOUND;
  }
  toString(): void {
    let list: E[] = [];
    let current = this.firstNode;
    while (current) {
      list.push(current.element);
      current = current.next;
    }
    console.log(list.join(" ===> "));
  }
}

let linkedList = new LinkedList<number>();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.toString();
export {};
