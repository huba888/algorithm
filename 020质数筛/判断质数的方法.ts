function isPrime(x: number) {
  if (x <= 1) return false;
  for (let i = 2; i * i <= x; i++) {
    if (x % i == 0) {
      return false;
    }
  }
  return true;
}
