let str = "abcbcxyz";
let subStr = "bcxy";
let start = Infinity;
for (let i = 0; i < str.length; i++) {
  if (str[i] == subStr[0]) {
    let k = 1;
    let x = i + 1;
    while (subStr[k] == str[x] && k < subStr.length && x < str.length) {
      k++;
      x++;
    }
    if (k == subStr.length) {
      start = i;
      break;
    }
  }
}
console.log(start);

// 求一个字符串的最长公共前后缀
function next_pre(s: string) {
  let next = new Array(s.length).fill(0);
  for (let i = 1, j = 0; i < s.length; i++) {
    while (j && s[i] !== s[j]) j = next[j - 1];
    if (s[i] == s[j]) j++;
    next[i] = j;
  }
  return next;
}

console.log(next_pre("abcdabx"));
// a b c d a b x
// 0 0 0 0 1 2 0

function KMP_match(s: string, p: string, begin: number) {
  let next = next_pre(s);
  for (let i = begin, j = 0; i < s.length; i++) {
    while (j > 0 && s[i] != p[j]) j = next[j - 1];
    if (s[i] == p[j]) j++;
    if (j === p.length) {
      return i - p.length + 1;
    }
  }
  return -1;
}
function preNext(p: string) {
  let next = new Array(p.length).fill(0);
  for (let i = 1, j = 0; i < p.length; i++) {
    while (j > 0 && p[i] !== p[j]) {
      j = next[j - 1];
    }
    if (p[i] == p[j]) {
      j++;
    }
    next[i] = j;
  }
  return next;
}
function KMPMatch(s: string, p: string) {
  let next = preNext(p);
  for (let i = 0, j = 0; i < s.length; i++) {
    while (j > 0 && s[i] !== p[j]) j = next[j - 1];
    if (s[i] == p[j]) {
      j++;
    }
    if (j == p.length) {
      return i - p.length + 1;
    }
  }
  return -1;
}

console.log(KMPMatch("abcdefgabcdeabcdg", "abcdg"), "1111111");
// abcabcx
// 000123
