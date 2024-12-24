const readline = require('readline');

// Tạo interface để đọc đầu vào từ console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertGraphFormat(graph) {
    const result = {};

    // Duyệt qua các liên kết để xây dựng cấu trúc mới
    graph.links.forEach(link => {
        const source = link.source;
        const target = link.target;
        const weight = link.value;

        // Nếu chưa có node trong kết quả, khởi tạo nó
        if (!result[source]) {
            result[source] = [];
        }
        if (!result[target]) {
            result[target] = [];
        }

        // Thêm liên kết từ source đến target
        result[source].push({ node: target, weight: weight });

        // Thêm liên kết từ target đến source (nếu cần thiết)
        result[target].push({ node: source, weight: weight });
    });

    return result;
}

// Dữ liệu đồ thị
const graph1 = {
    nodes: [
        { id: 'A', label: 'Node A' },
        { id: 'B', label: 'Node B' },
        { id: 'C', label: 'Node C' },
        { id: 'D', label: 'Node D' },
    ],
    links: [
        { source: 'A', target: 'B', value: 1 },
        { source: 'A', target: 'C', value: 2 },
        { source: 'B', target: 'D', value: 3 },
        { source: 'C', target: 'D', value: 4 },
    ],
};

// Chuyển đổi dữ liệu
const convertedGraph = convertGraphFormat(graph1);

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
                // Kết thúc nhập
                console.log('Đồ thị đã nhập:');
                console.log(graph);
                inputPoints(graph);
            }
        };
        inputEdge(0);
    });
}

function inputPoints(graph) {
    rl.question('Nhập tập các điểm (ví dụ: A B C): ', (points) => {
        const pointArray = points.split(' ').filter(p => graph[p]); // Lọc các điểm hợp lệ
        findCycles(graph, pointArray);
    });
}

function findCycles(graph, points) {
    const cycles = [];

    const dfs = (node, visited, path, totalWeight) => {
        if (visited[node]) {
            const cycleStartIndex = path.indexOf(node);
            if (cycleStartIndex !== -1) {
                const cycle = path.slice(cycleStartIndex);
                if (cycle.length > 2) { // Chu trình phải có ít nhất 3 đỉnh
                    cycles.push({ cycle, totalWeight });
                }
            }
            return;
        }

        visited[node] = true;
        path.push(node);

        for (const neighbor of graph[node]) {
            dfs(neighbor.node, visited, path, totalWeight + neighbor.weight);
        }

        path.pop();
        visited[node] = false;
    };

    for (const point of points) {
        const visited = {};
        dfs(point, visited, [], 0);
    }

    // Loại bỏ các chu trình trùng lặp
    const uniqueCycles = Array.from(new Set(cycles.map(cycleObj => cycleObj.cycle.join(',')))).map(cycle => cycle.split(','));

    console.log('Các chu trình đi qua tập các điểm đã nhập:');
    uniqueCycles.forEach(cycle => {
        console.log(cycle)
        // const cycleDetails = cycles.find(cycleObj => cycleObj.cycle.join(',') === cycle.join(','));
        // console.log(`Chu trình: ${cycle.join(' -> ')}, Tổng trọng số: ${cycleDetails.totalWeight}`);
    });
    
    rl.close();
}

// Gọi hàm nhập đồ thị
inputPoints(convertedGraph);