import ArrayQueue from "./Queue";
const queue = new ArrayQueue<string>();

queue.enqueue("abc");
queue.enqueue("cba");
queue.enqueue("nba");

console.log(queue.dequeue());
console.log(queue.peek());

console.log(queue.isEmpty());
console.log(queue.size());
