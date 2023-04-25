class Graph<T> {
  // 顶点
  private verteces: T[] = [];
  // 边
  private adjList: Map<T, T[]> = new Map();

  addVertex(vertex: T) {
    // 将我们的顶点保存在数组中
    this.verteces.push(vertex);
    this.adjList.set(vertex, []);
  }
  // 添加一个边 2个顶点的边
  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2);
    this.adjList.get(v2)?.push(v1);
  }
  traverse() {
    console.log("Graph");
    this.verteces.forEach((vertex) => {
      const edges = this.adjList.get(vertex);
      console.log(`${vertex} -> ${edges?.join(" ")}`);
    });
  }
  // 广度优先算法的实现 借助于一个 队列
  bfs() {
    if (this.verteces.length === 0) return;
    const queue: T[] = [this.verteces[0]];
    const visited = new Set();
    visited.add(this.verteces[0]);
    while (queue.length) {
      const vertex = queue.shift()!;
      console.log(vertex);
      const neighbors = this.adjList.get(vertex);
      if (!neighbors) continue;
      for (const nei of neighbors) {
        if (!visited.has(nei)) {
          queue.push(nei);
          visited.add(nei);
        }
      }
    }
  }
  // 深度优先算法
  dfs() {
    if (this.verteces.length === 0) return;
    const stack: T[] = [this.verteces[0]];
    const visited = new Set<T>();
    visited.add(this.verteces[0]);
    while (stack.length) {
      const vertex = stack.pop()!;
      console.log(vertex);
      const neighbors = this.adjList.get(vertex);
      if (!neighbors) return;
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const nei = neighbors[i];
        if (!visited.has(nei)) {
          visited.add(nei);
        }
      }
    }
  }
}

export {};
