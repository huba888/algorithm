// 二叉搜索树的接口设计 size 元素的数量 isEmpty是否为空 add添加元素 clear清空所有元素 remove移除元素 contains 是否包含某一个元素
// 前驱节点 中序遍历的前面一个节点
// 后继节点 中序遍历的后面一个节点

class BinaryTree<E> {
  root: Node<E> | null = null;
  length: number = 0;
  get size() {
    return this.length;
  }
  set size(value: number) {
    this.length = value;
  }
  clear() {
    this.root = null;
  }
  preOrderTraverse(cb: (element: E) => void) {
    let dfs = function (node: Node<E> | null) {
      if (node) {
        cb(node.element);
        dfs(node.left);
        dfs(node.right);
      }
    };
    dfs(this.root);
  }
  inOrderTraverse(cb: (element: E) => void) {
    let dfs = function (node: Node<E> | null) {
      if (node) {
        dfs(node.left);
        cb(node.element);
        dfs(node.right);
      }
    };
    dfs(this.root);
  }
  postOrderTraverse(cb: (element: E) => void) {
    let dfs = function (node: Node<E> | null) {
      if (node) {
        dfs(node.left);
        dfs(node.right);
        cb(node.element);
      }
    };
    dfs(this.root);
  }
  levelOrderTraverse(cb: (element: E) => void) {
    let queue = [this.root];
    while (queue.length) {
      let node = queue.shift()!;
      cb(node.element);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  prevCursor(node: Node<E>) {
    if (node == null) return null;
    if (node.left != null) {
      let temp = node.left;
      // 只要我的右边不为空,就一直往右边找
      while (temp.right) {
        temp = temp.right;
      }
      return temp;
    }
    // 从父节点,祖父节点中寻找
    while (node.parent && node.parent.left == node) {
      node = node.parent;
    }
    return node.parent;
  }
  successor(node: Node<E>): Node<E> | null {
    if (node == null) return null;
    if (node.right != null) {
      let temp = node.right;
      // 只要我的右边不为空,就一直往右边找
      while (temp.left) {
        temp = temp.left;
      }
      return temp;
    }
    // 从父节点,祖父节点中寻找
    while (node.parent && node.parent.right == node) {
      node = node.parent;
    }
    return node.parent;
  }
}
interface Comparable<E> {
  compareTo(element: E): number;
}
interface Comparator<E> {
  compare(e1: E, e2: E): number;
}
class BST<E> extends BinaryTree<E> {
  constructor(public comparator?: Comparator<E>) {
    super();
  }
  add(element: E) {
    // 添加一个元素
    this.elementNotNullCheck(element);
    // 只有一个节点的时候
    if (this.root == null) {
      this.root = new Node(element, null);
      this.size++;
      return;
    }
    // 需要添加一个节点
    let node: Node<E> | null = this.root!;
    let parent: Node<E> | null = this.root;
    let cmp: number = 0;
    while (node) {
      cmp = this.compare(element, node.element);
      parent = node;
      if (cmp > 0) {
        // 要插入的节点 比 当前的根节点大
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        // 不要直接返回就行
        node.element = element;
        // 相等的情况
        return;
      }
    }
    let newNode = new Node(element);
    newNode.parent = parent;
    if (cmp > 0) {
      // 插入的节点要插在 父节点的右侧
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this.size++;
  }
  remove(element: E) {
    this.removeAtNode(this.node(element));
  }
  removeAtNode(node: Node<E> | null) {
    if (node == null) return;
    this.size--;
    // 先分析度为2的节点 之后删除前驱
    if (node.hasTwoChildren()) {
      // 找到后继节点
      let s = this.successor(node)!;
      // 用后继节点的值
      node.element = s.element;
      // 删除后继节点
      node = s;
    }
    // 能来到这里 node 的度 必然是 1 或者 是0
    let replacement = node.left != null ? node.left : node.right;
    if (replacement !== null) {
      // node 是度为1 的节点
      replacement.parent = node.parent;
      if (node.parent == null) {
        // 删除的是根节点 并且根节点的度为一
        this.root = replacement;
      } else if (node == node.parent.left) {
        node.parent.left = replacement;
      } else if (node == node.parent.right) {
        node.parent.right = replacement;
      }
    } else {
      // node 是叶子节点
      if (node.parent == null) {
        // 要删除的是根节点 叶子节点
        this.root = null;
      } else {
        // 是叶子节点 但是不是根节点
        if (node == node.parent.left) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      }
    }
  }

  contains(element: E) {
    return this.node(element) !== null;
  }
  private elementNotNullCheck(element: any) {
    if (element == null) {
      throw new Error("element must not be null");
    }
  }
  node(element: E): Node<E> | null {
    let node = this.root;
    while (node) {
      let cmp = this.compare(element, node.element);
      if (cmp == 0) {
        return node;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }
  /**
   *
   * @param el
   * @param e2
   * el > e2 return > 0
   */
  compare(e1: E, e2: E): number {
    if (this.comparator) {
      return this.comparator.compare(e1, e2);
    }
    if (typeof e1 == "number" && typeof e2 == "number") {
      return e1 - e2;
    }
    return (e1 as Comparable<E>).compareTo(e2);
  }
}

class Node<E> {
  element: E;
  left: Node<E> | null = null;
  right: Node<E> | null = null;
  parent: Node<E> | null = null;
  constructor(element: E, parenet: Node<E> | null = null) {
    this.element = element;
    this.parent = parenet;
  }
  hasTwoChildren() {
    return this.left && this.right;
  }
  isLeaf() {
    return this.left == null && this.right == null;
  }
}
let nums = [7, 4, 9, 2, 5, 8, 11, 3];
class Person implements Comparable<Person> {
  constructor(public age: number) {}
  compareTo(element: Person): number {
    return this.age - element.age;
  }
}
class PersonComparator implements Comparator<Person> {
  compare(e1: Person, e2: Person): number {
    return e1.age - e2.age;
  }
}
let bst = new BST<Person>(new PersonComparator());
for (let i = 0; i < nums.length; i++) {
  bst.add(new Person(nums[i]));
}
// 可以传一个比较器,或者是传入一个可比较的对象
// 或者是传入一个number类型的数字
let bst2 = new BST();
for (let i = 0; i < nums.length; i++) {
  bst2.add(nums[i]);
}
console.log(bst2.size);
bst.preOrderTraverse((element) => {
  console.log(element.age);
});
bst2.preOrderTraverse((element) => {
  console.log(element);
});
bst2.remove(4);

bst2.preOrderTraverse((element) => {
  console.log(element);
});
export {};
// 讨论删除的情况
// 1. 删除的是叶子节点
// node = node.parent.left
// node.parent.left = null

// node = node.parent.right
// node.parent.right = null

// node.parent = null // 删除的是叶子节点 也是根节点
// root = null

// 2. 删除的是度为1的节点
// 用子节点替代原节点的位置
// 用child 替代 node 的位置
// 如果node 是左子节点
// child.parent = node.parent
// node.parent.left = child

// 如果node是右子节点
// child.parent = node.parent
// node.parent.right = child

// 如果node.parent = null // 删除的是根节点
// root = child
// child.parent = null

// 3. 删除的是度为2的节点
// 度为2的节点 一定是可以在左子树 或者 右子树中找到一个节点
// 一个节点的度为2 一定可以在左子树 找到 前驱
// 或者一定可以在右子树找到后继
// 并且前驱 的 度一定为0 或者 1 (因为 前驱是 node.left.right.right...)
// 找前驱或者后继的值 替代当前的位置
// 然后删除前驱或者后继
