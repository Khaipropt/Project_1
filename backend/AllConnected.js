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

function inputGraph() {
    rl.question('Chọn loại đồ thị (1: Vô hướng, 2: Có hướng): ', (type) => {
        rl.question('Nhập số đỉnh của đồ thị: ', (vertexCount) => {
            vertexCount = parseInt(vertexCount);
            const graph = {};
            const inputVertices = (count) => {
                if (count < vertexCount) {
                    rl.question(`Nhập đỉnh thứ ${count + 1}: `, (vertex) => {
                        if (!graph[vertex]) {
                            graph[vertex] = []; // Khởi tạo danh sách kề cho đỉnh
                        }
                        inputVertices(count + 1);
                    });
                } else {
                    inputEdges(graph, type);
                }
            };
            inputVertices(0);
        });
    });
}

function inputEdges(graph, type) {
    rl.question('Nhập số cạnh của đồ thị: ', (edgeCount) => {
        edgeCount = parseInt(edgeCount);
        const inputEdge = (count) => {
            if (count < edgeCount) {
                rl.question(`Nhập cạnh thứ ${count + 1} (ví dụ: A B 5): `, (edge) => {
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

                    inputEdge(count + 1);
                });
            } else {
                // Kết thúc nhập
                console.log('Đồ thị đã nhập:');
                console.log(graph);

                // Tìm các thành phần liên thông và tính tổng trọng số
                const { components, weights } = findConnectedComponents(graph);
                console.log('Các vùng liên thông và tổng trọng số của chúng:');
                components.forEach((component, index) => {
                    console.log(`Vùng liên thông ${index + 1}: ${component.join(', ')} với tổng trọng số: ${weights[index]}`);
                });
                rl.close();
            }
        };
        inputEdge(0);
    });
}

// Gọi hàm nhập đồ thị
inputGraph();