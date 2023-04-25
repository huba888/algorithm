// 最短路径算法,可以有负权边
// dj 是关注点
// bf 是关注边
let edges = [
  [0, 4, 100],
  [0, 1, 50],
  [0, 3, 30],
  [1, 2, 50],
  [3, 2, 20],
  [3, 4, 60],
  [2, 4, 10],
];
function BellmanFord(edges: number[][], n: number, s: number) {
  // 边数 n 点数
  let m = edges.length;
  let dis = new Array(n).fill(Infinity);
  let p = new Array(n).fill(-1);
  dis[s] = 0;
  // 松弛n-1次
  for (let i = 0; i < n - 1; i++) {
    let check = false;
    // 枚举每一条边
    for (let i = 0; i < m; i++) {
      let [l, r, w] = edges[i];
      // 通过 [l,r,w] 这条边的引入,使得我们到r的距离变短了
      if (dis[l] + w < dis[r]) {
        dis[r] = dis[l] + w;
        p[r] = l;
        check = true;
      }
    }
    if (!check) {
      // 提前结束
      break;
    }
  }
  console.log(p);
  return dis;
}
// [ -1, 0, 3, 0, 2 ]
console.log(BellmanFord(edges, 5, 0));
export {};
