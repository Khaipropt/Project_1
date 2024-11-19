const readline = require('readline');

// Tạo interface để đọc đầu vào từ console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hàm tìm các thành phần liên thông và tính tổng trọng số
function findConnectedComponents(graph) {
  const visited = new Set();
  const components = [];
  const weights = [];

  const dfs = (node, component, weightSum) => {
    visited.add(node);
    component.push(node);
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor.node)) {
          weightSum += neighbor.weight; // Cộng trọng số cạnh
          dfs(neighbor.node, component, weightSum);
        }
      }
    }
    return weightSum;
  };

  for (const node in graph) {
    if (!visited.has(node)) {
      const component = [];
      const weightSum = dfs(node, component, 0); // Bắt đầu với trọng số 0
      components.push(component);
      weights.push(weightSum); // Lưu tổng trọng số của thành phần
    }
  }

  return { components, weights };
}

// Hàm kiểm tra chu trình chứa hai đỉnh u và v và in ra chu trình
function findCycleContaining(graph, start, end) {
  const visited = new Set();
  const stack = [];
  const parent = {};

  const dfs = (node) => {
    visited.add(node);
    stack.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor.node)) {
        parent[neighbor.node] = node; // Lưu cha của neighbor
        if (dfs(neighbor.node)) {
          return true;
        }
      } else if (stack.includes(neighbor.node) && neighbor.node !== parent[node]) {
        // Nếu đã thăm lại và không phải là cha của node
        // Tìm chu trình
        const cycle = [];
        let idx = stack.indexOf(neighbor.node);
        for (let i = idx; i < stack.length; i++) {
          cycle.push(stack[i]);
        }
        cycle.push(neighbor.node); // Thêm đỉnh đầu tiên để hoàn thành chu trình

        // Kiểm tra xem chu trình có chứa cả u và v không
        if (cycle.includes(start) && cycle.includes(end)) {
          console.log(`Chu trình chứa hai đỉnh ${start} và ${end}: ${cycle.join(' -> ')}`);
          return true;
        }
      }
    }

    stack.pop();
    return false;
  };

  // Bắt đầu DFS từ đỉnh start
  return dfs(start);
}

// Hàm tìm chu trình giữa hai đỉnh u và v
function findCycle(graph, start, end, visited, path, cycles, currentWeight) {
  visited[start] = true;
  path.push(start);

  for (const edge of graph[start]) {
    const neighbor = edge.node;
    const weight = edge.weight;

    // Nếu tìm thấy chu trình
    if (neighbor === end && path.length > 1) {
      cycles.push({ path: [...path, end], weight: currentWeight + weight }); // Lưu chu trình
    } else if (!visited[neighbor]) {
      findCycle(graph, neighbor, end, visited, path, cycles, currentWeight + weight);
    }
  }

  // Quay lại để tìm kiếm chu trình khác
  visited[start] = false;
  path.pop();
}

// Hàm kiểm tra chu trình Hamilton
function hamiltonianCycle(graph, path, pos, u, v) {
  const n = Object.keys(graph).length;

  // Nếu tất cả các đỉnh đã được đưa vào chu trình
  if (pos === n) {
    // Kiểm tra xem có chu trình về đỉnh đầu tiên không
    if (graph[path[pos - 1]].some(edge => edge.node === path[0])) {
      // Kiểm tra xem u và v có trong chu trình không
      if (path.includes(u) && path.includes(v)) {
        console.log(`Chu trình Hamilton chứa hai đỉnh ${u} và ${v}: ${path.join(' -> ')} -> ${path[0]}`);
        return true;
      }
    }
    return false;
  }

  // Duyệt qua tất cả các đỉnh để tìm chu trình Hamilton
  for (const vertex of Object.keys(graph)) {
    if (isSafeHamilton(vertex, graph, path, pos)) {
      path[pos ] = vertex;

      // Gọi đệ quy để tiếp tục thêm đỉnh
      if (hamiltonianCycle(graph, path, pos + 1, u, v)) {
        return true;
      }

      // Nếu không tìm thấy chu trình, xóa đỉnh
      path[pos] = null;
    }
  }

  return false;
}

// Kiểm tra xem đỉnh có thể thêm vào chu trình Hamilton không
function isSafeHamilton(vertex, graph, path, pos) {
  // Nếu đỉnh đã được thêm vào chu trình
  if (path.includes(vertex)) {
    return false;
  }

  // Nếu đỉnh gần nhất với đỉnh hiện tại không có cạnh nối
  if (pos > 0 && !graph[path[pos - 1]].some(edge => edge.node === vertex)) {
    return false;
  }

  return true;
}

// Hàm kiểm tra bậc của các đỉnh
function checkDegrees(graph) {
  const degrees = {};

  for (const u in graph) {
    degrees[u] = graph[u].length; // Bậc của đỉnh u
  }

  // Kiểm tra bậc chẵn cho đồ thị vô hướng
  for (const degree of Object.values(degrees)) {
    if (degree % 2 !== 0) {
      return false; // Nếu có đỉnh có bậc lẻ
    }
  }

  return true; // Tất cả các đỉnh có bậc chẵn
}

// Hàm kiểm tra tính liên thông
function isConnected(graph) {
  const visited = {};
  const vertices = Object.keys(graph);

  // Tìm đỉnh đầu tiên có ít nhất một cạnh
  const startVertex = vertices.find(v => graph[v].length > 0);
  if (!startVertex) return true; // Nếu không có cạnh nào, coi như liên thông

  // DFS để kiểm tra tính liên thông
  const dfs = (v) => {
    visited[v] = true;
    for (const edge of graph[v]) {
      if (!visited[edge.node]) {
        dfs(edge.node);
      }
    }
  };

  dfs(startVertex);

  // Kiểm tra xem tất cả các đỉnh đã được thăm
  for (const v of vertices) {
    if (graph[v].length > 0 && !visited[v]) {
      return false;
    }
  }

  return true;
}

// Hàm tìm chu trình Euler
function findEulerianCycle(graph, path, currentVertex) {
  for (let edge of graph[currentVertex]) {
    // Xóa cạnh khỏi đồ thị
    graph[currentVertex] = graph[currentVertex].filter(e => e.node !== edge.node);
    graph[edge.node] = graph[edge.node].filter(e => e.node !== currentVertex);

    findEulerianCycle(graph, path, edge.node);
  }
  path.push(currentVertex);
}

// Hàm Bellman-Ford
function bellmanFord(graph, start, end) {
  const distances = {};
  const predecessors = {};
  const vertices = Object.keys(graph);

  // Khởi tạo khoảng cách
  for (const vertex of vertices) {
    distances[vertex] = Infinity;
    predecessors[vertex] = null;
  }
  distances[start] = 0;

  // Cập nhật khoảng cách cho tất cả các cạnh
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const u of vertices) {
      for (const edge of graph[u]) {
        const v = edge.node;
        const weight = edge.weight; // Trọng số của cạnh
        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          predecessors[v] = u;
        }
      }
    }
  }

  // Kiểm tra chu trình âm
  for (const u of vertices) {
    for (const edge of graph[u]) {
      const v = edge.node;
      const weight = edge.weight;
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        console.log("Đồ thị chứa chu trình âm.");
        return null;
      }
    }
  }

  // Xây dựng đường đi từ start đến end
  const path = [];
  for (let at = end; at !== null; at = predecessors[at]) {
    path.push(at);
  }
  path.reverse();

  return {
    distance: distances[end],
    path: path
  };
}

// Hàm nhập đồ thị
function inputGraph() {
  rl.question('Nhập số lượng nút: ', (numNodes) => {
    const graph = {};
    const nodeWeights = {};

    const inputNodeWeights = (nodeCount) => {
      if (nodeCount < numNodes) {
        rl.question(`Nhập trọng số cho nút ${nodeCount + 1} (ví dụ: A 10): `, (input) => {
          const [node, weight] = input.split(' ');
          nodeWeights[node] = parseInt(weight) || 0; // Mặc định trọng số là 0 nếu không nhập
          inputNodeWeights(nodeCount + 1);
        });
      } else {
        // Sau khi nhập xong trọng số cho các nút, bắt đầu nhập cạnh
        inputEdges(0);
      }
    };

    const inputEdges = (edgeCount) => {
      rl.question('Nhập số lượng cạnh: ', (numEdges) => {
        const edges = parseInt(numEdges);
        const addEdge = (count) => {
          if (count < edges) {
            rl.question(`Nhập cạnh thứ ${count + 1} (ví dụ: A B 5): `, (edge) => {
              const [u, v, weight] = edge.split(' ');
              const weightValue = parseInt(weight) || 0; // Mặc định trọng số là 0 nếu không nhập
              // Thêm cạnh vào danh sách kề với trọng số
              if (!graph[u]) graph[u] = [];
              graph[u].push({ node: v, weight: weightValue });

              // Nếu đồ thị vô hướng, thêm cạnh ngược lại
              if (!graph[v]) graph[v] = [];
              graph[v].push({ node: u, weight: weightValue });

              addEdge(count + 1);
            });
          } else {
            // Kết thúc nhập
            console.log('Đồ thị đã nhập:');
            console.log(graph);
            console.log('Trọng số các nút:');
            console.log(nodeWeights);

            // Tìm các thành phần liên thông và tính tổng trọng số
            const { components, weights } = findConnectedComponents(graph);
            console.log('Các vùng liên thông và tổng trọng số của chúng:');
            components.forEach((component, index) => {
              console.log(`Vùng liên thông ${index + 1}: ${component.join(', ')} với tổng trọng số: ${weights[index]}`);
            });

            rl.close();
          }
        };

        addEdge(0);
      });
    };

    inputNodeWeights(0);
  });
}

// Gọi hàm nhập đồ thị
inputGraph();