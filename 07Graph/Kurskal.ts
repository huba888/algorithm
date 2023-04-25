// Kruskal 算法
// 1.按照权值进行排序
// 2. 从权值最小开始连接(用并查集) 如果发现已经连接了就跳过
let edges = [
  [1, 2, 2],
  [1, 3, 1],
  [1, 4, 2],
  [2, 3, 1],
  [2, 5, 3],
  [3, 4, 3],
  [3, 5, 6],
];
edges.sort((a, b) => a[2] - b[2]);
let fa: number[] = [];
for (let i = 0; i <= 6; i++) {
  fa[i] = i;
}
function find(x: number) {
  if (fa[x] != x) fa[x] = find(fa[x]);
  return fa[x];
}
function isConnection(i: number, j: number) {
  return find(i) == find(j);
}
function union(i: number, j: number) {
  fa[find(i)] = find(j);
}
let n = 5;
let ans = 0;
// 已经连接了几条线了  ,如果有n 个 点 连接了n - 1条线,就可以直接退出
let k = 0;
for (let i = 0; i < edges.length; i++) {
  let vertex1 = edges[i][0];
  let vertex2 = edges[i][1];
  if (isConnection(vertex1, vertex2)) {
    continue;
  } else {
    ans += edges[i][2];
    union(vertex1, vertex2);
    k++;
    if (k == n - 1) {
      break;
    }
  }
}
console.log(ans);
