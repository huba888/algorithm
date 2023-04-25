let arr = [1, 3, 45, 61, 2];
//  1 到 3 加上 2
// 2 到 4 加上3
// 1 到 4 减去2 求最后的数组长什么样
let diff = new Array(arr.length + 1).fill(0);
// [0,0,0,0,0]
// [0,2,0,0,-2]
// 前缀和
// [0,0,2,2,2,0]
// [1, 3, 45, 61, 2];
function add(left: number, right: number, value: number): void {
  diff[left] += value;
  diff[right + 1] -= value;
}
add(1, 3, 2);
add(2, 4, 3);
add(1, 4, -2);
// 求前缀和
for (let i = 1; i < diff.length; i++) {
  diff[i] = diff[i - 1] + diff[i];
}
for (let i = 0; i < arr.length; i++) {
  arr[i] += diff[i + 1];
}
console.log(arr);
export {};
