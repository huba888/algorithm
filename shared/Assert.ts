class Assert {
  static test(name: string, isPassed: boolean) {
    console.log("------------");
    if (isPassed) {
      console.log(`${name} Task is Passed`);
    } else {
      console.log(`${name} Task is NoPassed`);
    }
    console.log("------------");
  }
}

export default Assert;
