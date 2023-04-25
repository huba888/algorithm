function minPathCost(grid: number[][], moveCost: number[][]): number {
  let sum = 0;
  let res = Infinity;
  let path: number[] = [];
  function backtrack(index: number, prev: number) {
    if (index == grid.length) {
      res = Math.min(res, sum);
      return;
    }
    for (let i = 0; i < grid[index].length; i++) {
      sum += grid[index][i];
      if (prev !== -1) {
        sum = sum + moveCost[prev][i];
      }
      backtrack(index + 1, grid[index][i]);
      if (prev !== -1) {
        sum = sum - moveCost[prev][i];
      }
      sum -= grid[index][i];
    }
  }
  backtrack(0, -1);
  return res;
}
console.log(
  minPathCost(
    [
      [5, 3],
      [4, 0],
      [2, 1],
    ],
    [
      [9, 8],
      [1, 5],
      [10, 12],
      [18, 6],
      [2, 4],
      [14, 3],
    ]
  )
);
