function distinctNames(ideas: string[]): number {
  let set = new Set(ideas);
  let res = 0;
  for (let i = 0; i < ideas.length; i++) {
    for (let j = i; j < ideas.length; j++) {
      let ideaA = ideas[j][0] + ideas[i].slice(1);
      let ideaB = ideas[i][0] + ideas[j].slice(1);
      if (!set.has(ideaA) && !set.has(ideaB)) {
        res++;
      }
    }
  }
  return res * 2;
}
// 咋优化? 
console.log(distinctNames(["coffee", "donuts", "time", "toffee"]));
console.log(distinctNames(["lack", "back"]));
