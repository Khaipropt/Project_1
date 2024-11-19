const readline = require('readline');

// Tạo interface để đọc đầu vào từ console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function inputGraph() {
    rl.question('Chọn loại đồ thị (1: Vô hướng, 2: Có hướng): ', (type) => {
    rl.question('Nhập số cạnh của đồ thị: ', (vertices) => {
        vertices = parseInt(vertices);
        const graph = {};
        const inputEdge = (edgeCount) => {
        if (edgeCount < vertices ) {
            rl.question(`Nhập cạnh thứ ${edgeCount + 1} (ví dụ: A B 5): `, (edge) => {
            const [u, v, weight] = edge.split(' ');
             // Nếu không nhập trọng số, mặc định là vô cực
             const weightValue = parseInt(weight) || Infinity;
            // Thêm cạnh vào danh sách kề với trọng số
            if (!graph[u]) graph[u] = [];
            graph[u].push({ node: v, weight: weightValue });

            // Nếu đồ thị vô hướng, thêm cạnh ngược lại
            if (type === '1') {
                if (!graph[v]) graph[v] = [];
                graph[v].push({ node: u, weight: weightValue });
            }

            inputEdge(edgeCount + 1);
            });
        } else {
          // Kết thúc nhập
            console.log('Đồ thị đã nhập:');
            console.log(graph);
            rl.close();
        }
        };
        inputEdge(0);
    });
    });
}

// Gọi hàm nhập đồ thị
inputGraph();