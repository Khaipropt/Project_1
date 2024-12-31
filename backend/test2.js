function findCycles(graph) {
    const nodes = graph.nodes.map(node => node.id);
    const adjList = {};

    // Tạo danh sách kề từ dữ liệu đồ thị
    graph.links.forEach(link => {
        if (!adjList[link.source]) {
            adjList[link.source] = [];
        }
        adjList[link.source].push(link.target);
    });

    const cycles = [];
    const visited = new Set();
    const stack = new Set();

    function dfs(node, path) {
        if (stack.has(node)) {
            // Nếu node đã có trong stack, có chu trình
            const cycleStartIndex = path.indexOf(node);
            if (cycleStartIndex !== -1) {
                const cycle = path.slice(cycleStartIndex);
                cycles.push(cycle);
            }
            return;
        }

        if (visited.has(node)) {
            return; // Đã thăm đỉnh này, không cần thăm lại
        }

        visited.add(node);
        stack.add(node);
        path.push(node);

        // Duyệt qua các đỉnh kề
        if (adjList[node]) {
            for (const neighbor of adjList[node]) {
                dfs(neighbor, path);
            }
        }

        stack.delete(node);
        path.pop();
    }

    // Duyệt qua tất cả các đỉnh
    for (const node of nodes) {
        dfs(node, []);
    }

    return cycles;
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
        { source: 'B', target: 'A', value: 1 },
        { source: 'A', target: 'E', value: 1 },
        { source: 'E', target: 'C', value: 1 },
        { source: 'A', target: 'C', value: 1 },
        { source: 'D', target: 'B', value: 2 },
        { source: 'C', target: 'D', value: 3 },
    ],
};

// Tìm tất cả chu trình
const cycles = findCycles(graph);
console.log(cycles);