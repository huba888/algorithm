// 下一个更大的元素
//[4,2,4,-1,-1]
function nextGreaterNumber(arr: number[]): number[] {
  let stack: number[] = [];
  let res: number[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    res[i] = stack.length == 0 ? -1 : stack[stack.length - 1]; /* ; */
    stack.push(arr[i]);
  }
  return res;
}
nextGreaterNumber([1, 2, 3]);
