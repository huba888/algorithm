export function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
function range(start: number, end?: number, step: number = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  let iteratorableObj: number[] = [];
  for (let i = start; i < end; i += step) {
    iteratorableObj.push(i);
  }
  return iteratorableObj;
}

function isSorted(arr: number[]): boolean {
  for (let num of range(0, arr.length - 1)) {
    if (arr[num] > arr[num + 1]) {
      return false;
    }
  }
  return true;
}
type SortAlgoFn = (arr: number[]) => number[];
export function testSort(SortFn: SortAlgoFn) {
  const nums = Array.from({ length: 10 }, () => {
    return Math.floor(Math.random() * 200);
  });
  console.log("排序前:");
  console.log(nums);
  const newArr = SortFn(nums);
  console.log("排序后:");
  console.log(newArr);
  console.log("是否是正确的排序?", isSorted(newArr));
}
