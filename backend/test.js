const readline = require('readline');

// Tạo interface để đọc đầu vào từ console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hàm tìm chu trình giữa hai đỉnh u và v
function findCycle(graph, start, end, visited, path, cycles) {
  visited[start] = true;
  path.push(start);

  for (const edge of graph[start]) {
    const neighbor = edge.node;
    const weight = edge.weight;

    // Nếu tìm thấy chu trình
    if (neighbor === end && path.length > 1) {
      cycles.push({ path: [...path, end], length: path.length + 1 }); // Lưu chu trình
    } else if (!visited[neighbor]) {
      findCycle(graph, neighbor, end, visited, path, cycles);
    }
  }

  // Quay lại để tìm kiếm chu trình khác
  visited[start] = false;
  path.pop();
}

// Hàm nhập đồ thị
function inputGraph() {
  rl.question('Nhập số đỉnh của đồ thị: ', (vertices) => {
    vertices = parseInt(vertices);
    const graph = {};

    const inputEdge = (edgeCount) => {
      if (edgeCount < vertices * (vertices - 1) / 2) {
        rl.question(`Nhập cạnh thứ ${edgeCount + 1} (ví dụ: A B 5): `, (edge) => {
          const [u, v, weight] = edge.split(' ');
          const weightValue = parseInt(weight); // Trọng số

          // Thêm cạnh vào danh sách kề với trọng số
          if (!graph[u]) graph[u] = [];
          if (!graph[v]) graph[v] = [];
          graph[u].push({ node: v, weight: weightValue });
          graph[v].push({ node: u, weight: weightValue }); // Nếu vô hướng

          inputEdge(edgeCount + 1);
        });
      } else {
        // Sau khi nhập xong các cạnh, hỏi người dùng về đỉnh bắt đầu và đỉnh kết thúc
        rl.question('Nhập đỉnh bắt đầu (u): ', (start) => {
          rl.question('Nhập đỉnh kết thúc (v): ', (end) => {
            const visited = {};
            const path = [];
            const cycles = [];

            // Tìm chu trình giữa u và v
            findCycle(graph, start, end, visited, path, cycles);

            if (cycles.length > 0) {
              console.log(`Chu trình giữa ${start} và ${end}:`);
              cycles.forEach((cycle, index) => {
                console.log(`Chu trình ${index + 1}: ${cycle.path.join(' -> ')} với độ dài: ${cycle.length}`);
              });
            } else {
              console.log(`Không tìm thấy chu trình giữa ${start} và ${end}.`);
            }

            rl.close();
          });
        });
      }
    };

    inputEdge(0);
  });
}

// Bắt đầu nhập đồ thị
inputGraph();