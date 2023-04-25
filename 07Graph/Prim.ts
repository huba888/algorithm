let edges = [
  [1, 2, 2],
  [1, 3, 1],
  [1, 4, 2],
  [2, 3, 1],
  [2, 5, 3],
  [3, 4, 3],
  [3, 5, 6],
];
// 五个点 1,2,3,4,5
let n = 5;
// 使用领接表来表示图
let graph = new Array(n + 1)
  .fill(0)
  .map((_) => new Array(n + 1).fill(Infinity));

let visit = new Array(n + 1).fill(false);
for (let i = 0; i < edges.length; i++) {
  let [l, r, w] = edges[i];
  graph[l][r] = w;
  graph[r][l] = w;
}
// [
//   [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
//   [Infinity, Infinity, 2, 1, 2, Infinity],
//   [Infinity, 2, Infinity, 1, Infinity, 3],
//   [Infinity, 1, 1, Infinity, 3, 6],
//   [Infinity, 2, Infinity, 3, Infinity, Infinity],
//   [Infinity, Infinity, 3, 6, Infinity, Infinity],
// ];
// 加入有 1 2 3 4 5 五个点
// graph[i][j] 表示 i到j 的权值
// dis[i]表示 i这个点 到 已经连接的点的距离 的最小值
function prim() {
  let sum = 0;
  // 点到   集合内所有的点的最小值
  let dis = new Array(n + 1).fill(Infinity);
  for (let i = 1; i <= n; i++) {
    // n次
    let t = -1;
    for (let j = 1; j <= n; j++) {
      // n个点
      if (visit[j]) {
        // 当前点没有在点集里面
        continue;
      }
      if (t == -1 || dis[t] > dis[j]) {
        t = j;
      }
    }
    visit[t] = true;
    if (i !== 1) sum += dis[t];
    for (let j = 1; j <= n; j++) {
      dis[j] = Math.min(dis[j], graph[t][j]);
    }
  }
  return sum;
}
console.log(prim());
export {};
