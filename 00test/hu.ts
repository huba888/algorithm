let arr = [1, 2, 3, 4, 5, 6];
let n = arr.length;
let diff = new Array(n + 1).fill(0);
for (let i = 0; i < arr.length; i++) {
  diff[i] = arr[i] - (arr[i - 1] || 0);
}
let optation = [[0, 5, 2]];
for (let [l, r, val] of optation) {
  diff[r + 1] -= val;
  diff[l] += val;
}
for (let i = 1; i < diff.length; i++) {
  diff[i] = diff[i - 1] + diff[i];
}
console.log(diff);
export {};
