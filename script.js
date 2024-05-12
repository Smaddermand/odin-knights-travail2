class Graph {
    constructor() {
      this.adjacencyList = {};
    }
  
    // Adds a vertex to the graph if it doesn't already exist
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
  
    // Adds an edge between two vertices, making the graph undirected
    addEdge(v1, v2) {
        if (!this.adjacencyList[v1]) {
          this.adjacencyList[v1] = [];
        }
        if (!this.adjacencyList[v2]) {
          this.adjacencyList[v2] = [];
        }
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
      }
  
    // Builds the chess graph with all legal knight moves as edges
    buildChessGraph() {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.addVertex(`${x},${y}`);
            }
        }
    
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let possiblePositions = [
                [x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1], [x - 2, y - 1],
                [x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2], [x - 1, y - 2]
                ];
        
                for (let [nx, ny] of possiblePositions) {
                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                    this.addEdge(`${x},${y}`, `${nx},${ny}`);
                }
            }
        }
        }
    }
  }
  
  // BFS function to find the shortest path from start to end
  function knightMoves(start, end) {
    const chessGraph = new Graph();
    chessGraph.buildChessGraph();
  
    let queue = [[start]];
    let visited = new Set();
    visited.add(start);
  
    while (queue.length > 0) {
      let path = queue.shift();
      let current = path[path.length - 1];
  
      if (current === end) {
        return path;
      }
  
      for (let neighbor of chessGraph.adjacencyList[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
  
    return null; // If no path is found
  }
  
  // Examples
  console.log(knightMoves('0,0', '1,2')); // Return the shortest path from [0,0] to [1,2]
  console.log(knightMoves('0,0', '3,3')); // Return (one of) the shortest paths from [0,0] to [3,3]
  