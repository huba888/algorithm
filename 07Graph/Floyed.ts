// 弗洛伊德算法
// 多源最短路径算法
// 求任意两个点之间的最短路径
// 如果自己和自己的距离不是0 而是 infinity 最后会有点问题 就是自己和自己的最短路径会有问题,但是关系不大
// e[i][i] = 0        //[ [ 0, 2, 5, 4 ], [ 9, 0, 3, 4 ], [ 6, 8, 0, 1 ], [ 5, 7, 10, 0 ] ]
// e[i][i] = infinity  //[ [ 9, 2, 5, 4 ], [ 9, 11, 3, 4 ], [ 6, 8, 11, 1 ], [ 5, 7, 10, 9 ] ]
let e = [
  [Infinity, 2, 6, 4],
  [Infinity, Infinity, 3, Infinity],
  [7, Infinity, Infinity, 1],
  [5, Infinity, 12, Infinity],
];
let n = 4;

for (let k = 0; k < n; k++) {
  // 从 i 点 到 j 点 可以经过 k 点周转 来缩短距离
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      e[i][j] = Math.min(e[i][j], e[i][k] + e[k][j]);
    }
  }
}
console.log(e);
//[ [ 0, 2, 5, 4 ], [ 9, 0, 3, 4 ], [ 6, 8, 0, 1 ], [ 5, 7, 10, 0 ] ]
export {};
