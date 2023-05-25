// 无限空间中有线的个体,映射到有限个个体
// 我们只关注相对大小
let arr = [
  100, 200, 300, 405, 134, 134, 51, 62346, 2, 463246, 2346, 36236346, 23462, 3,
];
let map = new Map<number, number>(
  [...new Set(arr)].sort((a, b) => a - b).map((v, i) => [v, i])
);
for (let i = 0; i < arr.length; i++) {
  arr[i] = map.get(arr[i])!;
}
// 离散化好了这个数组
console.log(arr);
