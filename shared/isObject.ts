import Assert from "./Assert";

function isObject(value: any) {
  const type = typeof value;
  return (value !== null && type === "object") || type === "function";
}

// Assert.test("null is not Object", isObject(null) === false);
export default isObject;
