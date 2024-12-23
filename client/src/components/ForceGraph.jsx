import React, { useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const ForceGraph = () => {
  // Dữ liệu cho đồ thị
  const [data, setData] = useState({
    nodes: [
      { id: 'A', label: 'Node A' },
      { id: 'B', label: 'Node B' },
      { id: 'C', label: 'Node C' },
      { id: 'D', label: 'Node D' },
    ],
    links: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'D' },
    ],
  });

  const [newNodeId, setNewNodeId] = useState('');
  const [newNodeLabel, setNewNodeLabel] = useState('');

  const addNode = () => {
    if (newNodeId && newNodeLabel && !data.nodes.find(node => node.id === newNodeId)) {
      const newNode = { id: newNodeId, label: newNodeLabel };
      const updatedNodes = [...data.nodes, newNode];
      setData({ ...data, nodes: updatedNodes });
      setNewNodeId(''); // Reset ô nhập liệu
      setNewNodeLabel(''); // Reset ô nhập liệu
    } else {
      alert('Node ID and label are required and must be unique.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={newNodeId}
          onChange={(e) => setNewNodeId(e.target.value)}
          placeholder="Enter new node ID"
        />
        <input
          type="text"
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.target.value)}
          placeholder="Enter new node label"
        />
        <button onClick={addNode}>Add Node</button>
      </div>
      <div style={{ width: '800px', height: '600px' }}>
        <ForceGraph2D
          graphData={data}
          nodeAutoColorBy="id"
          linkDirectionalParticles={4} // Hiệu ứng hạt cho các liên kết
          linkDirectionalParticleSpeed={d => d.value * 0.001} // Tốc độ hạt
          nodeLabel={node => node.label} // Hiển thị tên node
        />
      </div>
    </div>
  );
};

export default ForceGraph;