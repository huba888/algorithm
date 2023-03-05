// 声明ArrayList的接口和LinkedList
interface List<E> {
  readonly ELEMENT_NOT_FOUND: number;
  clear(): void;
  length(): number;
  isEmpty(): boolean;
  contains(element: E): boolean;
  get(index: number): E;
  set(index: number, element: E): void;
  add(element: E): void;
  addByIndex(index: number, element: E): void;
  remove(index: number): E;
  indexOf(element: E): number;
  toString(): void;
}
export default List;
