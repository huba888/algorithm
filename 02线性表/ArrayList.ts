import Assert from "../shared/Assert";
import isObject from "../shared/isObject";
type Equals<T> = { equals: (el: T) => boolean } | number | string | boolean;
class ArrayList<E extends Equals<E>> {
  private static readonly DEFAULT_CAPACITY = 10;
  private static readonly ELEMENT_NOT_FOUND = -1;
  private size: number = 0;
  private elements: E[];
  constructor(capacity: number = ArrayList.DEFAULT_CAPACITY) {
    capacity = capacity < 10 ? ArrayList.DEFAULT_CAPACITY : capacity;
    this.elements = new Array<E>(capacity);
  }
  private outOfBounds(index: number) {
    throw new RangeError(`index :${index} , Size : ${this.size}`);
  }
  private rangeCheck(index: number) {
    if (index < 0 || index >= this.size) {
      this.outOfBounds(index);
    }
  }
  private rangeCheckForAdd(index: number) {
    if (index < 0 || index > this.size) {
      this.outOfBounds(index);
    }
  }
  length(): number {
    return this.size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  contains(element: E): boolean {
    return this.indexOf(element) !== ArrayList.ELEMENT_NOT_FOUND;
  }
  get(index: number) {
    this.rangeCheck(index);
    return this.elements[index];
  }
  set(index: number, element: E): E {
    this.rangeCheck(index);
    let old = this.elements[index];
    this.elements[index] = element;
    return old;
  }
  add(element: E) {
    this.addByIndex(this.size, element);
  }
  // 不可以方法重载我们就单独写一个方法
  addByIndex(index: number, element: E) {
    this.rangeCheckForAdd(index);
    this.ensureCapacity(this.size + 1);
    for (let i = this.elements.length - 2; i >= index; i--) {
      this.elements[i + 1] = this.elements[i];
    }
    this.elements[index] = element;
    this.size++;
  }
  // 保障要有capacity 个容量
  private ensureCapacity(capacity: number) {
    let oldCapacity = this.elements.length;
    console.log(oldCapacity, capacity);
    if (oldCapacity >= capacity) return;
    // 扩容1.5倍
    let newCapacity = oldCapacity + (oldCapacity >> 1);
    let newElements = new Array<E>(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newElements[i] = this.elements[i];
    }
    this.elements = newElements;
    console.log(`扩容:旧容量${oldCapacity},新容量${newCapacity}`);
  }
  remove(index: number): E {
    this.rangeCheckForAdd(index);
    let old = this.elements[index];
    for (let i = index; i < this.size - 1; i++) {
      this.elements[i] = this.elements[i + 1];
      console.log(i);
    }
    // 把最后一个清空
    this.elements[--this.size] = null!;
    console.log("end");
    return old;
  }
  indexOf(element: E): number {
    for (let i = 0; i < this.elements.length; i++) {
      // 如果是对象,则调用equals
      let currentEl = this.elements[i];
      if (isObject(currentEl)) {
        let isEquals = (
          currentEl as { equals: (ele: typeof currentEl) => boolean }
        ).equals(element);
        if (isEquals) {
          return i;
        }
      } else if (currentEl == element) {
        return i;
      }
    }
    return ArrayList.ELEMENT_NOT_FOUND;
  }
  clear() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i] = null!;
    }
    this.size = 0;
  }
  toString() {
    let res = "[ ";
    for (let i = 0; i < this.size; i++) {
      res += this.elements[i] + ",";
    }
    res = "size = " + this.size + "   " + res.slice(0, -1) + "]";
    console.log(res);
  }
}
class Person {
  constructor(public name: string, public age: number) {}
  equals(p: Person): boolean {
    if (this.name == p.name && this.age == p.age) {
      return true;
    }
    return false;
  }
}
function main() {
  let array = new ArrayList<number>();
  array.add(88);
  Assert.test("remove index 0 element", array.get(0) === 88);
  console.log(array.indexOf(88));
  array.clear();
  array.toString();

  let p1Array = new ArrayList<Person>();
  p1Array.add(new Person("huba", 13));
  p1Array.add(new Person("huba1", 13));
  p1Array.add(new Person("huba2", 13));

  const index = p1Array.indexOf(new Person("huba", 13));
  console.log(index);
}
main();
