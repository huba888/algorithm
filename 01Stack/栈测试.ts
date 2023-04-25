import ArrayStack from "./Stack";

const stack = new ArrayStack<string>();
stack.push("aaa");
stack.push("bbb");
stack.push("ccc");

console.log(stack.peek());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());

console.log(stack.isEmpty());
console.log(stack.size());
