/**
 *
 * @param key 转换为key
 * @param max 数组的长度
 * @returns 索引
 */
function hashFunc(key: string, max: number): number {
  let hashCode = 0;
  for (let i = 0, length = key.length; i < length; i++) {
    // 使用霍纳法则计算hashcode
    // 这里使用31 而不是使用27 为了均匀分布
    hashCode = 31 * hashCode + key.charCodeAt(i);
  }
  // 求出索引值code
  const index = hashCode % max;
  return index;
}
/**
 *
 * @param num 要判断的数字
 * @returns 是否是一个质树
 */
function isPrime(num: number): boolean {
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
class HashTable<T = any> {
  // 创建一个数组
  private storage: [string, any][][] = [];
  // 数组的长度
  private length: number = 7;
  // 已经存放的个数
  private count: number = 0;
  private hashFunc(key: string, max: number) {
    let hashCode = 0;
    for (let i = 0, length = key.length; i < length; i++) {
      // 使用霍纳法则计算hashcode
      // 这里使用31 而不是使用27 为了均匀分布
      hashCode = 31 * hashCode + key.charCodeAt(i);
    }
    // 求出索引值code
    const index = hashCode % max;
    return index;
  }
  isPrime(num: number): boolean {
    for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  // 插入和修改操作
  put(key: string, value: T) {
    const index = this.hashFunc(key, this.length);
    // 取出索引位置对应的数组
    let bucket = this.storage[index];
    if (!bucket) {
      this.storage[index] = bucket = [];
    }
    // 已经有有一个数组了,但是还不知道里面有没有元素
    let flag = false;
    for (let i = 0, length = bucket.length; i < length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        flag = true;
        break;
      }
    }
    if (!flag) {
      bucket.push([key, value]);
      this.count++;
      // 填装因子 > 0.75
      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }
  // 获取值
  get(key: string): T | undefined {
    const index = this.hashFunc(key, this.length);
    const bucket = this.storage[index];
    if (!bucket || !bucket.length) return undefined;
    for (let i = 0, length = bucket.length; i < length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }
    return undefined;
  }
  // 删除一个值
  delete(key: string): T | undefined {
    const index = this.hashFunc(key, this.length);
    const bucket = this.storage[index];
    if (!bucket || !bucket.length) return undefined;
    for (let i = 0, length = bucket.length; i < length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;
        const loadFactor = this.count / this.length;
        // 对哈希表进行缩容
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }
        return tuple[1];
      }
    }
    return undefined;
  }
  private getNextPrime(num: number): number {
    // 去找一个质素
    while (!this.isPrime(num)) {
      num++;
    }
    if (num < 7) return 7;
    return num;
  }

  // 数组的扩容
  private resize(newLength: number) {
    let oldStoreage = this.storage;
    this.storage = [];
    this.length = this.getNextPrime(newLength);
    this.count = 0;
    oldStoreage.forEach((bucket) => {
      if (!bucket || !bucket.length) return;
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        this.put(tuple[0], tuple[1]);
      }
    });
  }
}

const hashTable = new HashTable();

hashTable.put("huba", "huba");
hashTable.put("cba", "1");
hashTable.put("nba", "nihao");

console.log(hashTable.get("nba"));
console.log(hashTable.get("cba"));
console.log(hashTable.get("huba"));
console.log(hashTable.delete("huba"));
console.log(hashTable.get("huba"));
export {};
