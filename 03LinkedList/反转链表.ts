// 方法一:利用一个栈结构
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  let stack: ListNode[] = [];
  while (head) {
    stack.push(head);
    head = head.next;
  }
  head = stack.pop()!;
  let current = head;

  while (stack.length) {
    let node = stack.pop()!;
    current.next = node;
    current = current.next;
  }
  // 这一步是很关键的,避免循环
  current.next = null;
  return head;
}
// 非递归方案
function reverseList2(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  let newHead: ListNode | null = null;
  while (head) {
    let current: ListNode | null = head.next;
    head.next = newHead;
    newHead = head;
    head = current;
  }
  return newHead;
}
// 递归的方式

function reverseList3(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  const newNode = reverseList3(head!.next);
  head.next.next = head;
  head.next = null;
  return newNode;
}
