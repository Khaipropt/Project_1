function findShortestPath(graph, start, end) {
    // Tạo danh sách kề từ dữ liệu
    const adjList = {};
    graph.nodes.forEach(node => {
        adjList[node.id] = [];
    });
    
    graph.links.forEach(link => {
        adjList[link.source].push({ target: link.target, weight: link.value });
        adjList[link.target].push({ target: link.source, weight: link.value }); // Đồ thị vô hướng
    });

    // Khởi tạo các cấu trúc dữ liệu cần thiết
    const distances = {};
    const visited = new Set();
    const parent = {};
    const priorityQueue = [];

    // Khởi tạo khoảng cách
    graph.nodes.forEach(node => {
        distances[node.id] = Infinity; // Khoảng cách ban đầu là vô cực
        parent[node.id] = null; // Không có cha ban đầu
    });
    distances[start] = 0; // Khoảng cách từ start đến start là 0
    priorityQueue.push({ node: start, distance: 0 });

    // Dijkstra's algorithm
    while (priorityQueue.length > 0) {
        // Sắp xếp hàng đợi theo khoảng cách
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node: current } = priorityQueue.shift();

        if (current === end) {
            break; // Đã tìm thấy đích
        }

        if (visited.has(current)) {
            continue; // Nếu đã thăm, bỏ qua
        }
        visited.add(current);

        // Cập nhật khoảng cách cho các đỉnh kề
        for (const neighbor of adjList[current]) {
            const newDistance = distances[current] + neighbor.weight;

            if (newDistance < distances[neighbor.target]) {
                distances[neighbor.target] = newDistance;
                parent[neighbor.target] = current;
                priorityQueue.push({ node: neighbor.target, distance: newDistance });
            }
        }
    }

    // Xây dựng đường đi từ start đến end
    const path = [];
    let current = end;

    while (current !== null) {
        path.push(current);
        current = parent[current];
    }

    // Đảo ngược đường đi để có thứ tự đúng
    path.reverse();

    // In ra kết quả
    const totalDistance = distances[end];
    console.log(`Đường đi ngắn nhất từ ${start} đến ${end}: ${path.join(' -> ')}`);
    console.log(`Tổng khoảng cách: ${totalDistance}`);

    return {path, totalDistance};
}

// Dữ liệu đồ thị
const graph = {
    nodes: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
    ],
    links: [
        { source: 'A', target: 'B', value: 1 },
        { source: 'A', target: 'E', value: 1 },
        { source: 'E', target: 'C', value: 1 },
        { source: 'A', target: 'C', value: 1 },
        { source: 'B', target: 'D', value: 2 }, // Trọng số khác nhau
        { source: 'C', target: 'D', value: 3 }, // Trọng số khác nhau
    ],
};

// Tìm đường đi ngắn nhất từ A đến D
const start = 'A';
const end = 'D';
console.log(findShortestPath(graph, start, end).path.join(",")) ;