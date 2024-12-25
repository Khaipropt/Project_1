export const findShortestPath = (graph, start, end, points) => {
    const allPoints = [start, ...points, end];
    const permutations = getPermutations(points);
    let minPath = null;
    let minWeight = Infinity;

    for (const perm of permutations) {
        const path = [start, ...perm, end];
        const weight = calculatePathWeight(graph, path);
        if (weight < minWeight) {
            minWeight = weight;
            minPath = path;
        }
    }

    console.log('Đường đi ngắn nhất:', minPath.join(' -> '));
    console.log('Trọng số:', minWeight);
    rl.close();
}

function calculatePathWeight(graph, path) {
    let totalWeight = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        const edge = graph[u].find(e => e.node === v);
        if (edge) {
            totalWeight += edge.weight;
        } else {
            return Infinity; // Không có đường đi
        }
    }
    return totalWeight;
}

function getPermutations(array) {
    if (array.length === 0) return [[]];
    const first = array[0];
    const rest = array.slice(1);
    const permsWithoutFirst = getPermutations(rest);
    const allPerms = [];
    for (const perm of permsWithoutFirst) {
        for (let i = 0; i <= perm.length; i++) {
            const permWithFirst = [...perm.slice(0, i), first, ...perm.slice(i)];
            allPerms.push(permWithFirst);
        }
    }
    return allPerms;
}