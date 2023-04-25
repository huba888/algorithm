import ArrayQueue from "./Queue";
// 击鼓传花 热土豆 国外的翻译
function hotPotato(names: string[], num: number) {
  if (names.length == 0) return 0;
  const queue = new ArrayQueue<string>();
  // 先把所有的人都加入队列
  for (const name of names) {
    queue.enqueue(name);
  }
  while (queue.size() !== 1) {
    for (let i = 1; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }
  const name = queue.dequeue();
  return names.indexOf(name!);
}

const lastIndex = hotPotato(["huba", "james", "kobe", "curry", "huxiaoba"], 3);
console.log(lastIndex);

console.log("--------------------------------------");

// 约瑟夫环
function lastRemaining(n: number, m: number) {
  const queue = new ArrayQueue<number>();
  for (let i = 0; i < 5; i++) {
    queue.enqueue(i);
  }
  while (queue.size() !== 1) {
    for (let i = 1; i < m; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }
  return queue.dequeue()!;
}
