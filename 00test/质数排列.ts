function maximumImportance(n: number, roads: [number, number][]): number {
  let count = new Array(n).fill(0);
  for (let i = 0; i < roads.length; i++) {
    count[roads[i][0]]++;
    count[roads[i][1]]++;
  }
  count = count.map((v, i) => [i, v]);
  count.sort((a, b) => b[1] - a[1]);
  let index = n;
  count = count.map((v) => [v[0], index--]);
  let map = new Map<number, number>(count);
  let res = roads.reduce((p, v) => {
    return p + map.get(v[1])! + map.get(v[0])!;
  }, 0);
  return res;
}
console.log(
  maximumImportance(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 2],
    [1, 3],
    [2, 4],
  ])
);
console.log(
  maximumImportance(5, [
    [0, 3],
    [2, 4],
    [1, 3],
  ])
);
