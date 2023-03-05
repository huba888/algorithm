import List from "./List";

abstract class AbstractList<T> implements List<T> {
  public ELEMENT_NOT_FOUND: number = -1;
  protected size: number = 0;
  protected readonly NOT_FOUND = -1;
  abstract clear(): void;
  length(): number {
    return this.size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  contains(element: T): boolean {
    return this.indexOf(element) !== this.NOT_FOUND;
  }
  add(element: T): void {
    return this.addByIndex(this.size, element);
  }
  protected rangeCheck(index: number) {
    if (index < 0 || index >= this.size) {
      this.outOfBounds(index);
    }
  }
  protected rangeCheckForAdd(index: number) {
    if (index < 0 || index > this.size) {
      this.outOfBounds(index);
    }
  }
  private outOfBounds(index: number) {
    throw new RangeError(`index :${index} , Size : ${this.size}`);
  }
  abstract get(index: number): T;
  abstract set(index: number, element: T): void;
  abstract addByIndex(index: number, element: T): void;
  abstract remove(index: number): T;
  abstract indexOf(element: T): number;
  abstract toString(): void;
}

export default AbstractList;
