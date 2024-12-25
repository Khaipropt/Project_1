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
        { source: 'A', target: 'C', value: 1 },
        { source: 'B', target: 'D', value: 1 },
        { source: 'C', target: 'D', value: 1 },
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
                inputPathFinding(graph);
            }
        };
        inputEdge(0);
    });
}

function inputPathFinding(graph) {
    rl.question('Nhập điểm bắt đầu: ', (start) => {
        rl.question('Nhập điểm kết thúc: ', (end) => {
            rl.question('Nhập các điểm cần đi qua (cách nhau bởi dấu phẩy): ', (points) => {
                // nhớ thêm cách thì mới được
                const pointsArray = points.split(' ').map(p => p.trim()).filter(p => p);
                findShortestPath(graph, start, end, pointsArray);
            });
        });
    });
}

function findShortestPath(graph, start, end, points) {
    const allPoints = [start, ...points, end];
    const permutations = getPermutations(points);
    let minPath = null;
    let minWeight = Infinity;

    for (const perm of permutations) {
        const path = [start, ...perm, end];
        const weight = calculatePathWeight(graph, path);
        if (weight < minWeight) {
            minWeight = weight;
            minPath = path;
        }
    }

    console.log('Đường đi ngắn nhất:', minPath.join(' -> '));
    console.log('Trọng số:', minWeight);
    rl.close();
}

function calculatePathWeight(graph, path) {
    let totalWeight = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        const edge = graph[u].find(e => e.node === v);
        if (edge) {
            totalWeight += edge.weight;
        } else {
            return Infinity; // Không có đường đi
        }
    }
    return totalWeight;
}

function getPermutations(array) {
    if (array.length === 0) return [[]];
    const first = array[0];
    const rest = array.slice(1);
    const permsWithoutFirst = getPermutations(rest);
    const allPerms = [];
    for (const perm of permsWithoutFirst) {
        for (let i = 0; i <= perm.length; i++) {
            const permWithFirst = [...perm.slice(0, i), first, ...perm.slice(i)];
            allPerms.push(permWithFirst);
        }
    }
    return allPerms;
}

// Gọi hàm nhập đồ thị
inputPathFinding(convertedGraph);