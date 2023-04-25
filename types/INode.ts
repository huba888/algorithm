class Node<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export default Node;

function Fn() {
  this.Fn2 = function () {
    console.log("1");
  };
}

Fn.Fn2 = function () {
  console.log(2);
};

const obj = new Fn().Fn2();
const obj2 = new Fn.Fn2();
