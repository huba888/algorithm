// [1,4,5,2,7]
// 求数组的小和
// 对于1左边没有比他小的 所以是        0
// 对于4左边1比他小    所以是         1
// 对于5 左边1,4比他小,所以是1+4 =    5
// 对于2 左边1比他小,所以是           1
// 对于7 左边1,4,5,2比他小所以是      12
// 全部加起来                       19

// 问题转换, 对于1 右边4个比他大 能生成4个1
//对于4右边2个比他大,能生成2个4
// 对于5 右边1个比他大能生成 1个5
// 对于2 生成一个2
// 对于7 没有 -------> 4 + 8 + 5 + 2 == 19
let c = 0;
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = arr.length >> 1;
  let leftArr = mergeSort(arr.slice(0, mid));
  let rightArr = mergeSort(arr.slice(mid, arr.length));
  // 进行合并
  // [1,1,2,3] [1,1,3,4]
  let temp: number[] = [];
  let left = 0;
  let right = 0;
  while (left < leftArr.length || right < rightArr.length) {
    let num1 = leftArr[left] || Infinity;
    let num2 = rightArr[right] || Infinity;
    if (num2 <= num1) {
      // 注意num2 == num1是 一定先将num2放入temp
      temp.push(num2);
      right++;
    } else {
      c = c + num1 * (rightArr.length - right);
      temp.push(num1);
      left++;
    }
  }
  return temp;
}
console.log(mergeSort([1, 4, 5, 2, 7]));
console.log(c);
export {};
