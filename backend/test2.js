function convertPathToGraph(path, links) {
    const nodes = [];
    const uniqueNodes = new Set();

    // Duyệt qua đường đi để tạo danh sách các node
    path.forEach(nodeId => {
        if (!uniqueNodes.has(nodeId)) {
            nodes.push({ id: nodeId, label: `Node ${nodeId}` });
            uniqueNodes.add(nodeId);
        }
    });

    // Tạo các liên kết từ đường đi
    const graphLinks = [];
    for (let i = 0; i < path.length - 1; i++) {
        const source = path[i];
        const target = path[i + 1];

        // Tìm giá trị weight từ links
        const link = links.find(link => 
            (link.source === source && link.target === target) || 
            (link.source === target && link.target === source)
        );

        if (link) {
            graphLinks.push({ source: link.source, target: link.target, value: link.value });
        }
    }

    return {
        nodes: nodes,
        links: graphLinks
    };
}

// Đường đi
const path = ['A', 'B', 'D', 'C'];

// Dữ liệu đồ thị ban đầu
const originalGraph = {
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

// Chuyển đổi đường đi thành đồ thị
const graphFromPath = convertPathToGraph(path, originalGraph.links);
console.log(graphFromPath);