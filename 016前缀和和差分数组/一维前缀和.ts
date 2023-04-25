let arr = [1, 3, 45, 61, 2];
// 求 1 到 3 的值

let prefixs = new Array(arr.length + 1).fill(0);

for (let i = 0; i < arr.length; i++) {
  prefixs[i + 1] = prefixs[i] + arr[i];
}
// prefixs [ 0, 1, 4, 49, 110, 112 ]
// 求 1 到 3 的和 就是
// prefixs[3] - prefix[2]
// 求2 到 4的和
// prefixs[4] - prefixs[3]

export {};
