// 迪杰斯特拉算法 n^2
// 单源最短路径算法 不能处理负边权
// 使用前提 不能有负权边
// 1. 如果有负权环 是一定没有最短路径的
// 2. 如果有负权边, 虽然有最短路径,但是不能使用Dijkstra算法
// 求出 start 到其他点的最短路径
let edges = [
  [0, 4, 100],
  [0, 1, 50],
  [0, 3, 30],
  [1, 2, 50],
  [3, 2, 20],
  [3, 4, 60],
  [2, 4, 10],
];
// 建立图结构
// 有n个节点 编号为n - 1
let n = 5;
// 邻接矩阵 g[i][j] 表示 i 到 j 有一条边 权值为 g[i][j]
let G = new Array(n).fill(0).map((_) => new Array(n).fill(Infinity));
for (let i = 0; i < edges.length; i++) {
  let [l, r, w] = edges[i];
  G[l][r] = w;
}
// dis[i] 表示的是 u 到 i 节点的最短距离
let dis = new Array(n).fill(Infinity);

// p[i] 表示原点到节点i 最短路径上的前驱
let p = new Array(n).fill(Infinity);

// flag[i] 表示 i 节点有没有加入我们的s集合
let flag = new Array(n).fill(false);

// 从原点出发 到其他各个节点的最短路径
function Dijkstra(u: number) {
  // 默认原点就是在集合 v 中
  for (let i = 0; i < n; i++) {
    dis[i] = G[u][i];
    if (dis[i] == Infinity) {
      // 如果和初始的连接,就为-1
      p[i] = -1;
    } else {
      // 连接前驱就是1
      p[i] = u;
    }
  }
  // 自己到自己的距离是0
  dis[u] = 0;
  flag[u] = true; // u 加入s集合
  //从u开始  找 n - 1 个节点的最短路径
  for (let i = 0; i < n - 1; i++) {
    let temp = Infinity;
    let t = u;
    // 找 v -s 中最小dis 并且记录找到的节点编号
    for (let j = 0; j < n; j++) {
      if (!flag[j] && dis[j] < temp) {
        temp = dis[j];
        t = j;
      }
    }
    // 把这个节点加入到s集合
    // 可能没有找到 ,
    if (t == u) {
      // 没有找到 为什么 ? 因为路径不可达
      return;
    }
    // 找到了
    flag[t] = true;
    // 松弛操作
    for (let j = 0; j < n; j++) {
      // 判断 v-s集合是否可以借助t 进行松弛 更新dis[]
      if (!flag[j] && dis[j] > dis[t] + G[t][j]) {
        // 更新最短距离
        dis[j] = dis[t] + G[t][j];
        // 跟新j的前驱
        p[j] = t;
      }
    }
  }
}
console.log(G);
Dijkstra(0);
console.log(dis);
console.log(p);
// 我们可以通过p节点来推出路径
function findp(end: number) {
  if (end == -1) {
    return;
  }
  findp(p[end]);
  console.log(end);
}
// 找 到 4 的最短路径
findp(4);
export {};

// s起点 G 邻接矩阵
function Dijkstra1(s: number, G: number[][]) {
  let n = G.length;
  let dis = new Array(n).fill(Infinity);
  let vis = new Array(n).fill(false);
  dis[s] = 0;
  for (let i = 0; i < n; i++) {
    // 找n个点 假设最小的点是 -1 其实是没有这个点的
    let mini = -1;
    let miniVal = Infinity;
    for (let j = 0; j < n; j++) {
      if (!vis[j] && dis[j] < miniVal) {
        mini = j;
        miniVal = dis[j];
      }
    }
    // 什么情况会没找到 没找到的点中,全部都是Infinity
    if (mini == -1) {
      // 找了一圈没找到
      break;
    }
    vis[mini] = true;
    for (let j = 0; j < n; j++) {
      if (!vis[j] && dis[j] > dis[mini] + G[mini][j]) {
        dis[j] = dis[mini] + G[mini][j];
      }
    }
  }
  return dis;
}
// 也可以用邻接表
function Dijkstra2(s: number, G: number[][]) {
  let n = G.length;
  let dis = new Array(n).fill(Infinity);
  let vis = new Array(n).fill(false);
  let p = new Array(n).fill(-1);
  dis[s] = 0;
  for (let i = 0; i < n; i++) {
    // 找n个点 假设最小的点是 -1 其实是没有这个点的
    let mini = -1;
    let miniVal = Infinity;
    for (let j = 0; j < n; j++) {
      if (!vis[j] && dis[j] < miniVal) {
        mini = j;
        miniVal = dis[j];
      }
    }
    // 什么情况会没找到 没找到的点中,全部都是Infinity
    if (mini == -1) {
      // 找了一圈没找到
      break;
    }
    vis[mini] = true;
    // dis[mini] 已经确定了 我们需要判断 dis[mini] + mini 到 j 的权值是否可以 跟新 dis[j]
    for (let j = 0; j < n; j++) {
      if (!vis[j] && dis[j] > dis[mini] + G[mini][j]) {
        dis[j] = dis[mini] + G[mini][j];
        p[j] = mini;
      }
    }
  }
  function findp(end: number, tem: number[]) {
    if (end == -1) {
      return;
    }
    findp(p[end], tem);
    tem.push(end);
  }
  let paths: number[][] = [];
  for (let i = 0; i < n; i++) {
    let tem: number[] = [];
    findp(i, tem);
    paths.push(tem);
  }
  console.log(paths);
  return dis;
}

console.log(Dijkstra2(0, G));
