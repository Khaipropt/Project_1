const graph = {
    nodes: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
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

function findCycle(graph) {
    const adjList = new Map();
    const visited = new Set();
    const recStack = new Set();
    const path = [];

    // Tạo danh sách kề từ dữ liệu đồ thị
    graph.links.forEach(link => {
        if (!adjList.has(link.source)) {
            adjList.set(link.source, []);
        }
        adjList.get(link.source).push(link.target);
    });

    function dfs(node) {
        if (recStack.has(node)) {
            // Nếu node đã có trong stack, có chu trình
            return true;
        }
        if (visited.has(node)) {
            return false;
        }

        visited.add(node);
        recStack.add(node);
        path.push(node);

        const neighbors = adjList.get(node) || [];
        for (const neighbor of neighbors) {
            if (dfs(neighbor)) {
                return true;
            }
        }

        recStack.delete(node);
        path.pop();
        return false;
    }

    for (const node of graph.nodes) {
        if (!visited.has(node.id)) {
            if (dfs(node.id)) {
                // Nếu tìm thấy chu trình, in ra chu trình
                return path.concat(node.id); // Trả về chu trình
            }
        }
    }

    return null; // Không tìm thấy chu trình
}

const cycle = findCycle(graph);
if (cycle) {
    console.log("Chu trình tìm thấy:", cycle);
} else {
    console.log("Không có chu trình nào.");
}