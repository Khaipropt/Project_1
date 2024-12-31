import { findConnectedComponents } from "./test.js";
const graphData = {
    nodes: [
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
    ],
    links: [
        { source: 'A', target: 'B', value: 1 },
        { source: 'A', target: 'C', value: 2 },
        { source: 'B', target: 'D', value: 3 },
        { source: 'C', target: 'D', value: 4 },
    ],
};

const connectedComponents = findConnectedComponents(graphData);
console.log(`Số lượng thành phần liên thông: ${connectedComponents.length}`);
connectedComponents.forEach((component, index) => {
    console.log(`Thành phần liên thông ${index + 1}: ${component.join(', ')}`);
});
