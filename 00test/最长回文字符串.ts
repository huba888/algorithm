function longestPalindrome(s: string): string {
  let len = s.length;
  let maxLen = -Infinity;
  let start = 0;
  const aroudCenterExtension = function (left: number, right: number) {
    if (left < 0 || right > s.length - 1) {
      return;
    }
    if (s[left] === s[right]) {
      if (right - left + 1 > maxLen) {
        start = left;
        maxLen = right - left + 1;
      }
      aroudCenterExtension(left - 1, right + 1);
    }
  };
  for (let i = 0; i < len; i++) {
    aroudCenterExtension(i - 1, i);
    aroudCenterExtension(i, i);
  }
  return s.substring(start, start + maxLen);
}

function add() {}
