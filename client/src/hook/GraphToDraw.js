function convertDataStructure(inputData) {
    // Step 1: Create a unique list of nodes
    const nodes = [];
    const nodeSet = new Set();

    for (const key in inputData) {
        if (!nodeSet.has(key)) {
            nodeSet.add(key);
            nodes.push({ id: key, label: `${key}` });
        }

        inputData[key].forEach(link => {
            if (!nodeSet.has(link.node)) {
                nodeSet.add(link.node);
                nodes.push({ id: link.node, label: `${link.node}` });
            }
        });
    }

    // Step 2: Create links based on the connections
    const links = [];

    for (const key in inputData) {
        inputData[key].forEach(link => {
            links.push({ source: key, target: link.node, value: link.weight });
        });
    }

    // Final output
    return {
        nodes: nodes,
        links: links
    };
}

// Example usage
const inputData = {
    '1': [],
    '2': [ { node: '3', weight: 4 } ],
    '3': [ { node: '2', weight: 4 } ]
};

const outputData = convertDataStructure(inputData);
console.log(outputData);