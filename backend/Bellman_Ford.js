const readline = require('readline');

// Tạo interface để đọc đầu vào từ console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
                    const weightValue = parseInt(weight) || Infinity;
                    if (!graph[u]) graph[u] = [];
                    graph[u].push({ node: v, weight: weightValue });

                    if (type === '1') {
                        if (!graph[v]) graph[v] = [];
                        graph[v].push({ node: u, weight: weightValue });
                    }

                    inputEdge(count + 1);
                });
            } else {
                inputStartAndEnd(graph);
            }
        };
        inputEdge(0);
    });
}

function inputStartAndEnd(graph) {
    rl.question('Nhập đỉnh bắt đầu (u): ', (start) => {
        rl.question('Nhập đỉnh kết thúc (v): ', (end) => {
            const result = bellmanFord(graph, start);
            if (result[end] === Infinity) {
                console.log(`Không có đường đi từ ${start} đến ${end}.`);
            } else {
                console.log(`Đường đi ngắn nhất từ ${start} đến ${end} có trọng số: ${result[end]}`);
            }
            rl.close();
        });
    });
}

function bellmanFord(graph, start) {
    const distances = {};
    const predecessors = {};
    const vertices = Object.keys(graph);

    // Khởi tạo khoảng cách
    for (const vertex of vertices) {
        distances[vertex] = Infinity;
        predecessors[vertex] = null;
    }
    distances[start] = 0;

    // Cập nhật khoảng cách
    for (let i = 0; i < vertices.length - 1; i++) {
        for (const u of vertices) {
            for (const edge of graph[u]) {
                const v = edge.node;
                const weight = edge.weight;
                if (distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    predecessors[v] = u; // Lưu lại đỉnh trước đó
                }
            }
        }
    }

    // In ra từng bước đi của đường đi ngắn nhất
    for (const vertex of vertices) {
        if (distances[vertex] < Infinity) {
            console.log(`Khoảng cách từ ${start} đến ${vertex} là ${distances[vertex]}`);
            printPath(predecessors, vertex);
        }
    }

    return distances;
}

function printPath(predecessors, vertex) {
    const path = [];
    let current = vertex;
    while (current !== null) {
        path.unshift(current);
        current = predecessors[current];
    }
    console.log(`Đường đi: ${path.join(' -> ')}`);
}

// Gọi hàm nhập đồ thị
inputGraph();