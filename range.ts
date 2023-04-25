// 请你实现一个range函数
// 具体功能查看下方用例:
// 依次输出 1 2 3 4
// 解释:相当于 for(let num = 1; num < 5; num+=1){console.log(num)}
for (let num of range(1, 5)) {
  console.log(num);
}

// 依次输出 0 1 2 3 4
// 解释:相当于 for(let num = 0; num < 5; num += 1){console.log(num)}
for (let num of range(5)) {
  console.log(num);
}

// 依次输出 2 4 6 8
// 解释:相当于 for(let num = 2; num < 10; num += 2){console.log(num)}
for (let num of range(2, 10, 2)) {
  console.log(num);
}
/**
 * 返回一个可迭代对象 可用于 of 遍历
 * @param start 开始
 * @param end 结束
 * @param step 步长
 */
// function* range(start: number, end?: number, step: number = 1) {
//   if (end === undefined) {
//     end = start;
//     start = 0;
//   }
//   for (let i = start; i < end!; i += step) {
//     yield i;
//   }
// }
function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  let iteratorableObj: number[] = [];
  for (let i = start; i < end; i += step) {
    iteratorableObj.push(i);
  }
  return iteratorableObj;
}
