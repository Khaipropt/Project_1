export const findCycles = (graph, points) => {
    const cycles = [];

    const dfs = (node, visited, path, totalWeight) => {
        if (visited[node]) {
            const cycleStartIndex = path.indexOf(node);
            if (cycleStartIndex !== -1) {
                const cycle = path.slice(cycleStartIndex);
                if (cycle.length > 2) { // Chu trình phải có ít nhất 3 đỉnh
                    cycles.push({ cycle, totalWeight });
                }
            }
            return;
        }

        visited[node] = true;
        path.push(node);

        for (const neighbor of graph[node]) {
            dfs(neighbor.node, visited, path, totalWeight + neighbor.weight);
        }

        path.pop();
        visited[node] = false;
    };

    for (const point of points) {
        const visited = {};
        dfs(point, visited, [], 0);
    }

    // Loại bỏ các chu trình trùng lặp
    const uniqueCycles = Array.from(new Set(cycles.map(cycleObj => cycleObj.cycle.join(',')))).map(cycle => cycle.split(','));

    console.log('Các chu trình đi qua tập các điểm đã nhập:');
    uniqueCycles.forEach(cycle => {
        const cycleDetails = cycles.find(cycleObj => cycleObj.cycle.join(',') === cycle.join(','));
        console.log(`Chu trình: ${cycle.join(' -> ')}, Tổng trọng số: ${cycleDetails.totalWeight}`);
    });
    return uniqueCycles;
}