function sequentSearch(array: number[], num: number) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == num) {
      return i;
    }
  }
  return -1; 
}
function binarySearch(array: number[], num: number) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midNum = array[mid];
    if (midNum === num) {
      return mid;
    } else if (midNum < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
