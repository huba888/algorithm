export default function task(fn: () => any) {
  console.time("fn");
  fn();
  console.log(`${fn.name} 函数的执行时间如下:`);
  console.timeEnd("fn");
}
