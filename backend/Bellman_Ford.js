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
                inputPoints(graph);
            }
        };
        inputEdge(0);
    });
}

function inputPoints(graph) {
    rl.question('Nhập các điểm cần đi qua (cách nhau bởi dấu cách): ', (points) => {
        const pointList = points.split(' ').filter(p => p in graph);
        const shortestPath = findShortestPath(graph, pointList);
        console.log('Đường đi ngắn nhất qua các điểm:', shortestPath);
        rl.close();
    });
}

function findShortestPath(graph, points) {
    const distances = {};
    const visited = {};
    const path = [];

    // Tính toán khoảng cách giữa các điểm
    for (const point of points) {
        distances[point] = {};
        for (const target of points) {
            if (point !== target) {
                distances[point][target] = dijkstra(graph, point, target);
            }
        }
    }

    // Tìm đường đi ngắn nhất qua tất cả các điểm (TSP)
    const tsp = (current, visitedPoints, currentPath, currentLength) => {
        if (visitedPoints.length === points.length) {
            return { length: currentLength, path: [...currentPath, current] };
        }

        let best = { length: Infinity, path: [] };

        for (const next of points) {
            if (!visited[next]) {
                visited[next] = true;
                const result = tsp(next, [...visitedPoints, next], [...currentPath, current], currentLength + distances[current][next]);
                visited[next] = false;

                if (result.length < best.length) {
                    best = result;
                }
            }
        }

        return best;
    };

    for (const start of points) {
        visited[start] = true;
        const result = tsp(start, [start], [], 0);
        visited[start] = false;

        if (result.length < best.length) {
            best = result;
        }
    }

    return best.path;
}

function dijkstra(graph, start, end) {
    const distances = {};
    const visited = {};
    const queue = [];

    for (const vertex in graph) {
        distances[vertex] = Infinity;
        visited[vertex] = false;
    }
    distances[start] = 0;
    queue.push({ node: start, distance: 0 });

    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
        const { node } = queue.shift();
        if (visited[node]) continue;
        visited[node] = true;

        for (const neighbor of graph[node]) {
            const newDistance = distances[node] + neighbor.weight;
            if (newDistance < distances[neighbor.node]) {
                distances[neighbor.node] = newDistance;
                queue.push({ node: neighbor.node, distance: newDistance });
            }
        }
    }

    return distances[end] === Infinity ? null : distances[end];
}

// Gọi hàm nhập đồ thị
inputGraph();