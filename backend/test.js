
// Hàm tìm các thành phần liên thông
export const findConnectedComponents = (data) => {
    const createAdjacencyList = (data) => {
        const adjacencyList = {};
        data.nodes.forEach(node => {
            adjacencyList[node.id] = [];
        });
        data.links.forEach(link => {
            adjacencyList[link.source].push(link.target);
            adjacencyList[link.target].push(link.source); // Nếu đồ thị vô hướng
        });
        return adjacencyList;
    };
    const dfs = (node, visited, adjacencyList, component) => {
        visited.add(node);
        component.push(node);
        adjacencyList[node].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                dfs(neighbor, visited, adjacencyList, component);
            }
        });
    };
    const adjacencyList = createAdjacencyList(data);
    const visited = new Set();
    const components = [];

    for (const node of data.nodes.map(n => n.id)) {
        if (!visited.has(node)) {
            const component = [];
            dfs(node, visited, adjacencyList, component);
            components.push(component);
        }
    }

    return components;
};