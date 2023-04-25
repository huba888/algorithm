let arr = [
  [1, 5, 6, 8],
  [9, 6, 7, 3],
  [5, 3, 2, 4],
];

// 给一个数组
// 0,0 到 2,1 加3
// 1,1 到 2,3 －4
// 问最后arr数组是多少
//   [4, 8, 6, 8],
//   [12, 5, 3, -1],
//   [8, 2, -2, 0],
let diff = new Array(arr.length + 1)
  .fill(0)
  .map((_) => new Array(arr[0].length + 1).fill(0));

add(0, 0, 2, 1, 3);
add(1, 1, 2, 3, -4);
console.log(diff.length, diff[0].length);

function add(
  row1: number,
  col1: number,
  row2: number,
  col2: number,
  value: number
) {
  console.log(row1, col1, row2, col2);
  diff[row1][col1] += value;
  diff[row2 + 1][col2 + 1] += value;
  diff[row1][col2 + 1] -= value;
  diff[row2 + 1][col1] -= value;
}
// 求前缀和数组
console.log(diff);
let prefix = new Array(arr.length + 1)
  .fill(0)
  .map((_) => new Array(arr[0].length + 1).fill(0));

// diff 的最后一列我们不需要管
for (let i = 0; i < diff.length - 1; i++) {
  for (let j = 0; j < diff[0].length - 1; j++) {
    prefix[i + 1][j + 1] =
      prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j] + diff[i][j];
  }
}
console.log(prefix);
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[0].length; j++) {
    arr[i][j] = arr[i][j] + prefix[i + 1][j + 1];
  }
}
console.log(arr);
export {};
