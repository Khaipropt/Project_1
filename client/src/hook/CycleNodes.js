const data = {
    nodes: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
        { id: 'R', label: 'R' },
    ],
    links: [
        { source: 'B', target: 'A', value: 1 },
        { source: 'A', target: 'E', value: 1 },
        { source: 'E', target: 'C', value: 1 },
        { source: 'A', target: 'C', value: 1 },
        { source: 'D', target: 'B', value: 2 },
        { source: 'C', target: 'D', value: 3 },
    ],
};




// Tìm tất cả chu trình đơn qua một điểm
const findCycles=(data, start, end) => {
    // Chuyển đổi dữ liệu từ links sang danh sách kề
    function buildGraph(data) {
        const graph = {};
        data.links.forEach(link => {
            if (!graph[link.source]) {
                graph[link.source] = [];
            }
            graph[link.source].push(link.target);
        });
        return graph;
    }
    const graph = buildGraph(data);

    const result = [];
    const visited = new Set();
    const path = [];

    function dfs(node) {
        if (path.length > 0 && node === start && visited.has(end)) {
            // Nếu chúng ta quay lại điểm bắt đầu, lưu chu trình
            result.push([...path]);
            return;
        }

        if (visited.has(node)) {
            return; // Nếu đã thăm nút này, không tiếp tục
        }

        visited.add(node);
        path.push(node);

        for (const neighbor of graph[node] || []) {
            dfs(neighbor);
        }

        path.pop(); // Quay lại để tìm chu trình khác
        visited.delete(node); // Xóa nút khỏi visited để cho phép tìm kiếm lại
    }

    dfs(start);
    return result;
}

// Sử dụng hàm

const startNode = 'A'; // Điểm bắt đầu
const cycles = findCycles(data, startNode, 'G');
console.log(cycles);