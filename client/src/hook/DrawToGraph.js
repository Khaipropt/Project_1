export const convertGraphFormat = (graph) => {
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
const graph = {
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
const convertedGraph = convertGraphFormat(graph);
console.log(convertedGraph);