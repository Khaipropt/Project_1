const convertPathToGraph = (path) => {
    const componentNodes = [];
    const componentLinks = [];
    const nodeSet = new Set();

    // Thêm các node vào componentNodes và nodeSet
    path.forEach((node) => {
        if (!nodeSet.has(node)) {
            componentNodes.push({ id: node, label: `Node ${node}` });
            nodeSet.add(node);
        }
    });

    // Tạo các liên kết (componentLinks) giữa các node
    for (let i = 0; i < path.length - 1; i++) {
        const source = path[i];
        const target = path[i + 1];
        componentLinks.push({ source, target, value: i + 1 }); // Giá trị có thể được điều chỉnh theo yêu cầu
    }

    return { componentNodes, componentLinks };
    }