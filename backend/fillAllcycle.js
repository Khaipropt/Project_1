const readline = require('readline');

// Tạo interface để đọc đầu vào từ console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function inputGraph() {
    rl.question('Chọn loại đồ thị (1: Vô hướng, 2: Có hướng): ', (type) => {
        rl.question('Nhập số cạnh của đồ thị: ', (vertices) => {
            vertices = parseInt(vertices);
            const graph = {};
            const inputEdge = (edgeCount) => {
                if (edgeCount < vertices) {
                    rl.question(`Nhập cạnh thứ ${edgeCount + 1} (ví dụ: A B 5): `, (edge) => {
                        const [u, v, weight] = edge.split(' ');
                        const weightValue = parseInt(weight) || Infinity;

                        // Thêm cạnh vào danh sách kề với trọng số
                        if (!graph[u]) graph[u] = [];
                        graph[u].push({ node: v, weight: weightValue });

                        // Nếu đồ thị vô hướng, thêm cạnh ngược lại
                        if (type === '1') {
                            if (!graph[v]) graph[v] = [];
                            graph[v].push({ node: u, weight: weightValue });
                        }

                        inputEdge(edgeCount + 1);
                    });
                } else {
                    // Kết thúc nhập
                    console.log('Đồ thị đã nhập:');
                    console.log(graph);
                    findCycles(graph);
                }
            };
            inputEdge(0);
        });
    });
}

// Hàm tìm chu trình chứa hai điểm u và v
function findCycles(graph) {
    rl.question('Nhập điểm bắt đầu (u): ', (start) => {
        rl.question('Nhập điểm kết thúc (v): ', (end) => {
            const cycles = [];
            const visited = new Set();

            const dfs = (node, path, length) => {
                visited.add(node);
                path.push(node);

                // Nếu tìm thấy cả u và v trong chu trình và quay lại điểm bắt đầu
                if (path.includes(start) && path.includes(end) && path[0] === node && path.length > 2) {
                    cycles.push({ path: [...path], length });
                }

                for (const neighbor of graph[node] || []) {
                    // Tránh chu trình vô hạn
                    if (!visited.has(neighbor.node) || (neighbor.node === start && path.length > 2)) {
                        dfs(neighbor.node, path, length + neighbor.weight);
                    }
                }

                visited.delete(node);
                path.pop();
            };

            dfs(start, [], 0);

            if (cycles.length > 0) {
                console.log('Các chu trình chứa cả u và v tìm thấy:');
                cycles.forEach(cycle => {
                    console.log(`Chu trình: ${cycle.path.join(' -> ')}, Độ dài: ${cycle.length}`);
                });

                const minCycle = cycles.reduce((min, cycle) => cycle.length < min.length ? cycle : min);
                const maxCycle = cycles.reduce((max, cycle) => cycle.length > max.length ? cycle : max);

                console.log(`Chu trình tối thiểu: ${minCycle.path.join(' -> ')}, Độ dài: ${minCycle.length}`);
                console.log(`Chu trình tối đa: ${maxCycle.path.join(' -> ')}, Độ dài: ${maxCycle.length}`);
            } else {
                console.log('Không tìm thấy chu trình nào chứa cả hai điểm.');
            }

            rl.close();
        });
    });
}

// Gọi hàm nhập đồ thị
inputGraph();